import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Create Enums and Table for Gallery Albums
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_gallery_albums_status') THEN
        CREATE TYPE "public"."enum_gallery_albums_status" AS ENUM('published', 'draft');
      END IF;
    END $$;

    CREATE TABLE IF NOT EXISTS "gallery_albums" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "collection_id" integer NOT NULL,
      "cover_image_id" integer,
      "cover_url" varchar,
      "description" varchar,
      "order" numeric DEFAULT 0,
      "status" "enum_gallery_albums_status" DEFAULT 'published' NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'gallery_albums_collection_id_fk') THEN
        ALTER TABLE "gallery_albums" ADD CONSTRAINT "gallery_albums_collection_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."gallery_categories"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'gallery_albums_cover_image_id_fk') THEN
        ALTER TABLE "gallery_albums" ADD CONSTRAINT "gallery_albums_cover_image_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "gallery_albums_slug_idx" ON "gallery_albums" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "gallery_albums_collection_idx" ON "gallery_albums" USING btree ("collection_id");
    CREATE INDEX IF NOT EXISTS "gallery_albums_order_idx" ON "gallery_albums" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "gallery_albums_updated_at_idx" ON "gallery_albums" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "gallery_albums_created_at_idx" ON "gallery_albums" USING btree ("created_at");

    -- 2. Link Gallery Images to Albums
    ALTER TABLE "gallery_images" ADD COLUMN IF NOT EXISTS "album_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'gallery_images_album_id_fk') THEN
        ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."gallery_albums"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "gallery_images_album_idx" ON "gallery_images" USING btree ("album_id");

    -- 3. Payload Document Locking Support for Albums
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gallery_albums_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_gallery_albums_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_albums_fk" FOREIGN KEY ("gallery_albums_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_albums_id");

    -- 4. Seed Canonical Album: "Eddie the Trooper" under "3D Prints"
    DO $$
    DECLARE
      prints_cat_id integer;
      eddie_album_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;

      IF prints_cat_id IS NOT NULL THEN
        -- Insert or retrieve Eddie the Trooper album
        INSERT INTO "gallery_albums" ("title", "slug", "collection_id", "cover_url", "description", "order", "status")
        VALUES (
          'Eddie the Trooper',
          'eddie-the-trooper',
          prints_cat_id,
          '/images/art/eddie-the-trooper/thumbnails/IMG_0693.webp',
          'Resin 3D print, assembly, and scenic base breakdown',
          1,
          'published'
        )
        ON CONFLICT ("slug") DO UPDATE SET 
          "collection_id" = prints_cat_id,
          "cover_url" = EXCLUDED.cover_url
        RETURNING id INTO eddie_album_id;

        IF eddie_album_id IS NULL THEN
          SELECT id INTO eddie_album_id FROM "gallery_albums" WHERE "slug" = 'eddie-the-trooper' LIMIT 1;
        END IF;

        -- Associate verified Eddie project images to the new album
        IF eddie_album_id IS NOT NULL THEN
          UPDATE "gallery_images"
          SET "album_id" = eddie_album_id
          WHERE "category_id" = prints_cat_id
            AND ("project" = 'Eddie the Trooper' OR "filename" IN (
              'IMG_0513.webp', 'IMG_0522.webp', 'IMG_0560.webp', 'IMG_0572.webp',
              'IMG_0578.webp', 'IMG_0607.webp', 'IMG_0612.webp', 'IMG_0617.webp',
              'IMG_0686.webp', 'IMG_0690.webp', 'IMG_0693.webp', 'IMG_0838.webp',
              'IMG_0949.webp', 'IMG_0957.webp', 'IMG_0967.webp', 'IMG_0971.webp'
            ));
        END IF;
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "gallery_images" SET "album_id" = NULL;
    ALTER TABLE "gallery_images" DROP CONSTRAINT IF EXISTS "gallery_images_album_id_fk";
    DROP INDEX IF EXISTS "gallery_images_album_idx";
    ALTER TABLE "gallery_images" DROP COLUMN IF EXISTS "album_id";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gallery_albums_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_gallery_albums_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gallery_albums_id";

    DROP TABLE IF EXISTS "gallery_albums" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_gallery_albums_status";
  `);
}
