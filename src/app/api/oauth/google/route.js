import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function getRedirectUri(request) {
  const host = request?.headers?.get('x-forwarded-host') || request?.nextUrl?.host || (request?.url ? new URL(request.url).host : 'localhost:3000');
  const proto = request?.headers?.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const computed = `${proto}://${host}/api/oauth/google/callback`;

  const envUri = process.env.GOOGLE_REDIRECT_URI;
  if (envUri) {
    // If envUri is configured for localhost but request is on live domain, prioritize computed live URL
    if (envUri.includes('localhost') && !host.includes('localhost')) {
      return computed;
    }
    return envUri;
  }
  return computed;
}

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = getRedirectUri(request);

  if (!clientId) {
    return NextResponse.json(
      {
        error: 'Google OAuth configuration is missing on the server.',
        details: 'GOOGLE_CLIENT_ID is missing from the server environment variables.',
      },
      { status: 500 }
    );
  }

  const scope = 'openid email profile';
  const state = 'oauth-state'; // For simple personal portfolio auth
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}&` +
    `state=${state}&` +
    `prompt=select_account`;

  return NextResponse.redirect(googleAuthUrl);
}
