import jwt from 'jsonwebtoken';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import { s3Storage } from '@payloadcms/storage-s3';
import { Posts } from './src/collections/Posts';
import { AdminLinks } from './src/collections/AdminLinks';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: [
        '/src/components/GoogleLoginButton#GoogleLoginButton',
      ],
      afterNavLinks: [
        '/src/components/LogoutButton#LogoutButton',
      ],
    },
  },
  collections: [
    {
      slug: 'users',
      auth: {
        strategies: [
          {
            name: 'google-oauth-strategy',
            authenticate: async ({ headers, payload }) => {
              try {
                const cookieHeader = headers.get('cookie') || '';
                const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
                  const [name, ...value] = cookie.trim().split('=');
                  if (name && value) {
                    acc[name] = value.join('=');
                  }
                  return acc;
                }, {});
                const token = cookies['payload-token'];
                console.log('[Strategy Debug] Cookie payload-token present:', !!token);
                if (!token) return { user: null };

                const decoded = jwt.verify(token, payload.secret);
                console.log('[Strategy Debug] Decoded JWT:', decoded);
                if (!decoded || !decoded.id) return { user: null };

                const user = await payload.findByID({
                  collection: 'users',
                  id: decoded.id,
                });
                console.log('[Strategy Debug] Found user by ID in strategy:', user ? { id: user.id, email: user.email } : 'None');

                if (user) {
                  user.collection = 'users';
                  return { user };
                }
              } catch (err) {
                console.error('[Strategy Debug] Error in custom strategy verification:', err.message);
              }
              return { user: null };
            }
          }
        ]
      },
      fields: [],
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    Posts,
    AdminLinks,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'a-very-secure-secret-placeholder-change-this',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: false,
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.SUPABASE_S3_ENDPOINT || '',
        region: 'us-east-1',
        forcePathStyle: true,
      },
    }),
  ],
});
