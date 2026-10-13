import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

// The gallery_albums table was created after the global RLS migration
// (20260616_204349_enable_rls_on_all_tables) and its own migration did not
// enable RLS. Enabling RLS without policies blocks access via Supabase's
// PostgREST API (anon/authenticated roles), while Payload keeps working
// because it connects as the table owner.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gallery_albums" ENABLE ROW LEVEL SECURITY;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gallery_albums" DISABLE ROW LEVEL SECURITY;
  `);
}
