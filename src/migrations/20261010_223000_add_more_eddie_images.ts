import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;

      IF prints_cat_id IS NOT NULL THEN
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('Eddie the Trooper — Workbench Kit Flat Lay', 'IMG_0838.webp', '/images/art/eddie-the-trooper/IMG_0838.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0838.webp', prints_cat_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1536, '4/3', 12, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Hollow Torso on Build Plate', 'IMG_0949.webp', '/images/art/eddie-the-trooper/IMG_0949.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0949.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 13, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Scenic Base on Build Plate', 'IMG_0957.webp', '/images/art/eddie-the-trooper/IMG_0957.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0957.webp', prints_cat_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1536, '4/3', 14, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Complete Diorama Parts Set', 'IMG_0967.webp', '/images/art/eddie-the-trooper/IMG_0967.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0967.webp', prints_cat_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 15, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Torso & Legs Assembly Check', 'IMG_0971.webp', '/images/art/eddie-the-trooper/IMG_0971.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0971.webp', prints_cat_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 16, 'published'::"enum_gallery_images_status")
        ) AS v("title", "filename", "image_url", "thumb_url", "category_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
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
    WHERE "filename" IN ('IMG_0838.webp', 'IMG_0949.webp', 'IMG_0957.webp', 'IMG_0967.webp', 'IMG_0971.webp');
  `);
}
