import { draftMode, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const tokenFromQuery = searchParams.get('token');

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }

  // Verify authorization
  let isAuthenticated = false;
  const secret = process.env.PAYLOAD_SECRET || 'a-very-secure-secret-placeholder-change-this';

  // In local development, permit preview without requiring production auth tokens
  if (process.env.NODE_ENV === 'development') {
    isAuthenticated = true;
  }

  // 1. Verify token provided by Payload's generatePreviewURL
  if (!isAuthenticated && tokenFromQuery) {
    try {
      const decoded = jwt.verify(tokenFromQuery, secret);
      if (decoded && decoded.id) {
        isAuthenticated = true;
      }
    } catch {
      // Invalid token, proceed to check cookie
    }
  }

  // 2. Verify payload-token cookie from authenticated editor session
  if (!isAuthenticated) {
    try {
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get('payload-token')?.value;
      if (cookieToken) {
        const decoded = jwt.verify(cookieToken, secret);
        if (decoded && decoded.id) {
          isAuthenticated = true;
        }
      }
    } catch {
      // Cookie reading/verification error
    }
  }

  if (!isAuthenticated) {
    return new Response('Unauthorized: Please log in to Payload CMS to preview draft posts', {
      status: 401,
    });
  }

  // Enable Next.js Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect directly to the requested article
  redirect(`/blog/${slug}`);
}
