import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_homepage_background" AS ENUM('digital-eclipse', 'contour-flow', 'alpine-landscape');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "homepage_background" "enum_site_settings_homepage_background" DEFAULT 'digital-eclipse',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "site_settings" ENABLE ROW LEVEL SECURITY;

    INSERT INTO "site_settings" ("id", "homepage_background")
    VALUES (1, 'contour-flow')
    ON CONFLICT ("id") DO NOTHING;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_site_settings_homepage_background";
  `)
}
