import { MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_site_settings_homepage_background"
    ADD VALUE IF NOT EXISTS 'chladni-plate';
  `);
}

export async function down(): Promise<void> {
  // PostgreSQL cannot remove a single enum value. Keep this additive value so
  // rollback does not rewrite or discard the user's saved background choice.
}
