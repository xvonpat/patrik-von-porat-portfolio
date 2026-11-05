import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
      leatherface_album_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;

      IF prints_cat_id IS NOT NULL THEN
        -- Insert or retrieve Leatherface album
        INSERT INTO "gallery_albums" ("title", "slug", "collection_id", "cover_url", "description", "order", "status")
        VALUES (
          'Leatherface',
          'leatherface',
          prints_cat_id,
          '/images/art/leatherface/thumbnails/IMG_1341.webp',
          'Resin 3D print and painting build of Leatherface',
          3,
          'published'
        )
        ON CONFLICT ("slug") DO UPDATE SET 
          "collection_id" = prints_cat_id,
          "cover_url" = EXCLUDED.cover_url,
          "description" = EXCLUDED.description,
          "order" = EXCLUDED.order,
          "status" = EXCLUDED.status
        RETURNING id INTO leatherface_album_id;

        IF leatherface_album_id IS NULL THEN
          SELECT id INTO leatherface_album_id FROM "gallery_albums" WHERE "slug" = 'leatherface' LIMIT 1;
        END IF;

        IF leatherface_album_id IS NOT NULL THEN
          INSERT INTO "gallery_images" 
            ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
          SELECT * FROM (VALUES
            ('Leatherface: Resin Bust Print Assembly', 'IMG_1341.webp', '/images/art/leatherface/IMG_1341.webp', '/images/art/leatherface/thumbnails/IMG_1341.webp', prints_cat_id, leatherface_album_id, 'Leatherface', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 1, 'published'::"enum_gallery_images_status"),
            ('Leatherface: Painting and Texturing Detail', 'IMG_1342.webp', '/images/art/leatherface/IMG_1342.webp', '/images/art/leatherface/thumbnails/IMG_1342.webp', prints_cat_id, leatherface_album_id, 'Leatherface', 'landscape'::"enum_gallery_images_orientation", 2048, 1536, '4/3', 2, 'published'::"enum_gallery_images_status"),
            ('Leatherface: Full Bust Presentation', 'IMG_1347.webp', '/images/art/leatherface/IMG_1347.webp', '/images/art/leatherface/thumbnails/IMG_1347.webp', prints_cat_id, leatherface_album_id, 'Leatherface', 'landscape'::"enum_gallery_images_orientation", 2364, 1330, '16/9', 3, 'published'::"enum_gallery_images_status")
          ) AS v("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
          WHERE NOT EXISTS (
            SELECT 1 FROM "gallery_images" gi WHERE gi."filename" = v."filename"
          );
        END IF;
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gallery_images" 
    WHERE "filename" IN ('IMG_1341.webp', 'IMG_1342.webp', 'IMG_1347.webp');

    DELETE FROM "gallery_albums" 
    WHERE "slug" = 'leatherface';
  `);
}
