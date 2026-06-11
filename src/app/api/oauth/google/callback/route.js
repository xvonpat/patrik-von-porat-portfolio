import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '../../../../../../payload.config.ts';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided.' }, { status: 400 });
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
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
    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail || email.toLowerCase() !== ownerEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'Unauthorized: This account is not registered to access the admin panel.' },
        { status: 403 }
      );
    }

    // 4. Resolve the user in the Payload database
    const payload = await getPayload({ config: configPromise });
    const userList = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    let user = userList.docs[0];
    if (!user) {
      // Create user if they do not exist
      user = await payload.create({
        collection: 'users',
        data: {
          email: email,
          password: crypto.randomBytes(32).toString('hex'),
        },
      });
    }

    // 5. Generate a Payload-compatible authentication token (JWT) using 'jose'
    const secretKey = new TextEncoder().encode(payload.secret);
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
