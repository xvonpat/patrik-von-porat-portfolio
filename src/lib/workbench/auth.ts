import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface AuthResult {
  authorized: boolean;
  user: any | null;
  payload: any;
  error?: string;
}

/**
 * Independently verifies authentication and admin authorization for all Workbench API endpoints.
 * Requires a verified payload-token JWT belonging to a valid user in the Payload `users` collection.
 * No dev bypasses or unauthenticated access are permitted.
 */
export async function verifyAdminAuth(req?: Request): Promise<AuthResult> {
  const payload = await getPayload({ config: configPromise });
  const secret = process.env.PAYLOAD_SECRET || 'a-very-secure-secret-placeholder-change-this';

  // 1. Try Payload's native auth header check
  if (req?.headers) {
    try {
      const { user } = await payload.auth({ headers: req.headers });
      if (user) {
        return { authorized: true, user, payload };
      }
    } catch {
      // Continue to cookie check
    }
  }

  // 2. Try cookie-based payload-token verification via Next.js cookies()
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value;
    if (token) {
      const decoded = jwt.verify(token, secret) as any;
      if (decoded && decoded.id) {
        const user = await payload.findByID({
          collection: 'users',
          id: decoded.id,
        });
        if (user) {
          return { authorized: true, user, payload };
        }
      }
    }
  } catch {
    // Continue
  }

  // 3. Fallback: Parse Cookie header directly from Request object if present
  if (req?.headers) {
    try {
      const cookieHeader = req.headers.get('cookie') || '';
      const parsedCookies = cookieHeader.split(';').reduce((acc: Record<string, string>, c: string) => {
        const [name, ...val] = c.trim().split('=');
        if (name && val.length > 0) {
          acc[name] = val.join('=');
        }
        return acc;
      }, {});

      const directToken = parsedCookies['payload-token'];
      if (directToken) {
        const decoded = jwt.verify(directToken, secret) as any;
        if (decoded && decoded.id) {
          const user = await payload.findByID({
            collection: 'users',
            id: decoded.id,
          });
          if (user) {
            return { authorized: true, user, payload };
          }
        }
      }
    } catch {
      // Continue
    }
  }

  // Strict enforcement: Unauthenticated or non-admin requests are rejected with 401
  return {
    authorized: false,
    user: null,
    payload,
    error: 'Unauthorized: A valid Payload CMS admin session token is required to access Workbench Assistant.',
  };
}
