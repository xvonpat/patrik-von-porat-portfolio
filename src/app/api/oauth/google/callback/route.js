import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '../../../../../../payload.config.ts';
import { getRedirectUri, findEnvVar } from '../route.js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided.' }, { status: 400 });
  }

  const clientId = findEnvVar('GOOGLE_CLIENT_ID') || '';
  const clientSecret = findEnvVar('GOOGLE_CLIENT_SECRET') || '';
  const redirectUri = getRedirectUri(request);

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error: 'Server misconfiguration: Google OAuth credentials (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET) missing on the server.',
      },
      { status: 500 }
    );
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || 'Failed to exchange authorization code.' },
        { status: 400 }
      );
    }

    // 2. Fetch user details from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userInfo = await userInfoResponse.json();
    const email = userInfo.email;

    if (!email) {
      return NextResponse.json({ error: 'Could not retrieve email from Google.' }, { status: 400 });
    }

    // 3. Verify user matches the OWNER_EMAIL in env variables
    const ownerEmail = findEnvVar('OWNER_EMAIL');
    if (!ownerEmail || email.toLowerCase() !== ownerEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'Unauthorized: This account is not registered to access the admin panel.' },
        { status: 403 }
      );
    }

    // 4. Resolve the user in the Payload database
    const payload = await getPayload({ config: configPromise });
    let user;
    try {
      const userList = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });
      user = userList?.docs?.[0];
    } catch (findErr) {
      console.error('[Google OAuth] Error searching for user:', findErr);
    }

    if (!user) {
      // Create user if they do not exist
      try {
        user = await payload.create({
          collection: 'users',
          data: {
            email: email,
            password: crypto.randomBytes(32).toString('hex'),
          },
        });
      } catch (createErr) {
        console.warn('[Google OAuth] Failed to create user with password, attempting without password:', createErr?.message);
        user = await payload.create({
          collection: 'users',
          data: {
            email: email,
          },
        });
      }
    }

    if (!user || !user.id) {
      throw new Error(`Failed to resolve or create admin user for email: ${email}`);
    }

    // 5. Generate a Payload-compatible authentication token (JWT) using 'jose'
    const secret = payload.secret || payload.config?.secret || process.env.PAYLOAD_SECRET;
    if (!secret) {
      throw new Error('Missing Payload JWT secret configuration.');
    }
    const secretKey = new TextEncoder().encode(secret);
    const issuedAt = Math.floor(Date.now() / 1000);
    const exp = issuedAt + 60 * 60 * 24 * 7; // 7 days

    const payloadToken = await new SignJWT({
      email: user.email,
      id: user.id,
      collection: 'users',
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt(issuedAt)
      .setExpirationTime(exp)
      .sign(secretKey);

    // 6. Redirect to the admin dashboard and set the auth cookie
    const adminUrl = new URL('/admin', request.url);
    const response = NextResponse.redirect(adminUrl);
    
    response.cookies.set('payload-token', payloadToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error in Google OAuth callback:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
