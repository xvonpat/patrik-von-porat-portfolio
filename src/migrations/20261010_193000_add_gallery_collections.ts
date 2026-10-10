import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Create Enums and Tables for Gallery
    CREATE TYPE "public"."enum_gallery_categories_status" AS ENUM('published', 'draft');

    CREATE TABLE IF NOT EXISTS "gallery_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "order" numeric DEFAULT 0,
      "eyebrow" varchar,
      "description" varchar,
      "status" "enum_gallery_categories_status" DEFAULT 'published' NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "gallery_categories_slug_idx" ON "gallery_categories" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "gallery_categories_order_idx" ON "gallery_categories" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "gallery_categories_updated_at_idx" ON "gallery_categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "gallery_categories_created_at_idx" ON "gallery_categories" USING btree ("created_at");

    CREATE TYPE "public"."enum_gallery_images_orientation" AS ENUM('landscape', 'portrait');
    CREATE TYPE "public"."enum_gallery_images_status" AS ENUM('published', 'draft');

    CREATE TABLE IF NOT EXISTS "gallery_images" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "filename" varchar,
      "image_id" integer,
      "image_url" varchar,
      "thumb_url" varchar,
      "category_id" integer,
      "project" varchar,
      "orientation" "enum_gallery_images_orientation" DEFAULT 'landscape' NOT NULL,
      "order" numeric DEFAULT 0,
      "width" numeric DEFAULT 1200,
      "height" numeric DEFAULT 800,
      "aspect_ratio" varchar DEFAULT '3/2',
      "status" "enum_gallery_images_status" DEFAULT 'published' NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE SET NULL ON UPDATE no action;
    ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "gallery_images_category_idx" ON "gallery_images" USING btree ("category_id");
    CREATE INDEX IF NOT EXISTS "gallery_images_image_idx" ON "gallery_images" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "gallery_images_order_idx" ON "gallery_images" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "gallery_images_project_idx" ON "gallery_images" USING btree ("project");

    -- 2. Payload Document Locking support
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gallery_categories_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "gallery_images_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_gallery_categories_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_categories_fk" FOREIGN KEY ("gallery_categories_id") REFERENCES "public"."gallery_categories"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_gallery_images_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_images_fk" FOREIGN KEY ("gallery_images_id") REFERENCES "public"."gallery_images"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_categories_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_images_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_images_id");

    -- 3. Seed Canonical Collections
    INSERT INTO "gallery_categories" ("name", "slug", "order", "eyebrow", "description", "status") VALUES
    ('Summer 2026', 'summer-2026', 1, 'Adobe Lightroom Collection', 'Curated Web Album • 35mm & Digital', 'published'),
    ('3D Prints', '3d-prints', 2, 'Physical Models', 'Resin printing, assembly, and hand-painted miniatures', 'published'),
    ('Graphite', 'graphite', 3, 'Traditional Studies', 'Graphite on paper • value and proportion studies', 'published'),
    ('Charcoal', 'charcoal', 4, 'Traditional Studies', 'Charcoal studies • gesture and contrast', 'published')
    ON CONFLICT ("slug") DO NOTHING;

    -- 4. Seed Existing 24 Summer 2026 Photographs
    DO $$
    DECLARE
      summer_cat_id integer;
    BEGIN
      SELECT id INTO summer_cat_id FROM "gallery_categories" WHERE slug = 'summer-2026' LIMIT 1;

      IF summer_cat_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM "gallery_images" WHERE category_id = summer_cat_id) THEN
        INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status") VALUES
        ('IMG_1552', 'IMG_1552.jpg', '/images/gallery/images/large/IMG_1552.jpg', '/images/gallery/images/thumbnails/IMG_1552.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 1, 'published'),
        ('IMG_1553', 'IMG_1553.jpg', '/images/gallery/images/large/IMG_1553.jpg', '/images/gallery/images/thumbnails/IMG_1553.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 2, 'published'),
        ('IMG_1555', 'IMG_1555.jpg', '/images/gallery/images/large/IMG_1555.jpg', '/images/gallery/images/thumbnails/IMG_1555.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 3, 'published'),
        ('IMG_1556', 'IMG_1556.jpg', '/images/gallery/images/large/IMG_1556.jpg', '/images/gallery/images/thumbnails/IMG_1556.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 4, 'published'),
        ('IMG_1558', 'IMG_1558.jpg', '/images/gallery/images/large/IMG_1558.jpg', '/images/gallery/images/thumbnails/IMG_1558.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 5, 'published'),
        ('IMG_1559', 'IMG_1559.jpg', '/images/gallery/images/large/IMG_1559.jpg', '/images/gallery/images/thumbnails/IMG_1559.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 6, 'published'),
        ('IMG_1601', 'IMG_1601.jpg', '/images/gallery/images/large/IMG_1601.jpg', '/images/gallery/images/thumbnails/IMG_1601.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 7, 'published'),
        ('IMG_1610', 'IMG_1610.jpg', '/images/gallery/images/large/IMG_1610.jpg', '/images/gallery/images/thumbnails/IMG_1610.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 8, 'published'),
        ('IMG_1612', 'IMG_1612.jpg', '/images/gallery/images/large/IMG_1612.jpg', '/images/gallery/images/thumbnails/IMG_1612.jpg', summer_cat_id, 'portrait', 800, 1200, '2/3', 9, 'published'),
        ('IMG_1626', 'IMG_1626.jpg', '/images/gallery/images/large/IMG_1626.jpg', '/images/gallery/images/thumbnails/IMG_1626.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 10, 'published'),
        ('IMG_1630', 'IMG_1630.jpg', '/images/gallery/images/large/IMG_1630.jpg', '/images/gallery/images/thumbnails/IMG_1630.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 11, 'published'),
        ('IMG_1649', 'IMG_1649.jpg', '/images/gallery/images/large/IMG_1649.jpg', '/images/gallery/images/thumbnails/IMG_1649.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 12, 'published'),
        ('IMG_0024', 'IMG_0024.jpg', '/images/gallery/images/large/IMG_0024.jpg', '/images/gallery/images/thumbnails/IMG_0024.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 13, 'published'),
        ('IMG_0094', 'IMG_0094.jpg', '/images/gallery/images/large/IMG_0094.jpg', '/images/gallery/images/thumbnails/IMG_0094.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 14, 'published'),
        ('IMG_1658', 'IMG_1658.jpg', '/images/gallery/images/large/IMG_1658.jpg', '/images/gallery/images/thumbnails/IMG_1658.jpg', summer_cat_id, 'landscape', 1200, 800, '3/2', 15, 'published'),
        ('IMG_0137', 'IMG_0137.jpg', '/images/gallery/images/large/IMG_0137.jpg', '/images/gallery/images/thumbnails/IMG_0137.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 16, 'published'),
        ('IMG_0149', 'IMG_0149.jpg', '/images/gallery/images/large/IMG_0149.jpg', '/images/gallery/images/thumbnails/IMG_0149.jpg', summer_cat_id, 'landscape', 1200, 900, '4/3', 17, 'published'),
        ('IMG_0191', 'IMG_0191.jpg', '/images/gallery/images/large/IMG_0191.jpg', '/images/gallery/images/thumbnails/IMG_0191.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 18, 'published'),
        ('IMG_0197', 'IMG_0197.jpg', '/images/gallery/images/large/IMG_0197.jpg', '/images/gallery/images/thumbnails/IMG_0197.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 19, 'published'),
        ('IMG_0222', 'IMG_0222.jpg', '/images/gallery/images/large/IMG_0222.jpg', '/images/gallery/images/thumbnails/IMG_0222.jpg', summer_cat_id, 'landscape', 1200, 900, '4/3', 20, 'published'),
        ('IMG_0232', 'IMG_0232.jpg', '/images/gallery/images/large/IMG_0232.jpg', '/images/gallery/images/thumbnails/IMG_0232.jpg', summer_cat_id, 'landscape', 1200, 900, '4/3', 21, 'published'),
        ('IMG_0273', 'IMG_0273.jpg', '/images/gallery/images/large/IMG_0273.jpg', '/images/gallery/images/thumbnails/IMG_0273.jpg', summer_cat_id, 'portrait', 900, 1200, '3/4', 22, 'published'),
        ('IMG_0295', 'IMG_0295.jpg', '/images/gallery/images/large/IMG_0295.jpg', '/images/gallery/images/thumbnails/IMG_0295.jpg', summer_cat_id, 'portrait', 900, 1200, '3/4', 23, 'published'),
        ('IMG_0312', 'IMG_0312.jpg', '/images/gallery/images/large/IMG_0312.jpg', '/images/gallery/images/thumbnails/IMG_0312.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 24, 'published');
      END IF;
    END $$;

    -- 5. Enable Row Level Security
    ALTER TABLE "gallery_categories" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "gallery_images" ENABLE ROW LEVEL SECURITY;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "gallery_images" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "gallery_categories" DISABLE ROW LEVEL SECURITY;

    DROP TABLE IF EXISTS "gallery_images" CASCADE;
    DROP TABLE IF EXISTS "gallery_categories" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_gallery_images_status";
    DROP TYPE IF EXISTS "public"."enum_gallery_images_orientation";
    DROP TYPE IF EXISTS "public"."enum_gallery_categories_status";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gallery_images_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gallery_categories_id";
  `);
}
