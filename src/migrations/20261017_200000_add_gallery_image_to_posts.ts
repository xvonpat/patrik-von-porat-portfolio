import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "gallery_image_id" integer;

    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_gallery_image_id_gallery_images_id_fk" FOREIGN KEY ("gallery_image_id") REFERENCES "public"."gallery_images"("id") ON DELETE SET NULL ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "posts_gallery_image_idx" ON "posts" USING btree ("gallery_image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_gallery_image_id_gallery_images_id_fk";
    DROP INDEX IF EXISTS "posts_gallery_image_idx";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "gallery_image_id";
  `);
}
