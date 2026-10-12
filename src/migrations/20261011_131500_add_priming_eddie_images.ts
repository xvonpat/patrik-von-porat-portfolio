import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
      eddie_album_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;
      SELECT id INTO eddie_album_id FROM "gallery_albums" WHERE "slug" = 'eddie-the-trooper' LIMIT 1;

      IF prints_cat_id IS NOT NULL THEN
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('Eddie the Trooper — Priming Prep & Chaos Black', 'IMG_0985.webp', '/images/art/eddie-the-trooper/IMG_0985.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0985.webp', prints_cat_id, eddie_album_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 17, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Chaos Black Undercoat', 'IMG_0986.webp', '/images/art/eddie-the-trooper/IMG_0986.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0986.webp', prints_cat_id, eddie_album_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 18, 'published'::"enum_gallery_images_status")
        ) AS v("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        WHERE NOT EXISTS (
          SELECT 1 FROM "gallery_images" gi WHERE gi."filename" = v."filename"
        );
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gallery_images" 
    WHERE "filename" IN ('IMG_0985.webp', 'IMG_0986.webp');
  `);
}
