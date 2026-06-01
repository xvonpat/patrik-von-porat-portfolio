import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "seo_seo_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "seo_canonical_url" varchar;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP CONSTRAINT "posts_seo_og_image_id_media_id_fk";
  
  DROP INDEX "posts_seo_seo_og_image_idx";
  ALTER TABLE "posts" DROP COLUMN "seo_seo_title";
  ALTER TABLE "posts" DROP COLUMN "seo_meta_description";
  ALTER TABLE "posts" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "posts" DROP COLUMN "seo_canonical_url";`)
}
