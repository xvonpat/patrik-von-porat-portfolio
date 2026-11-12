import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
      leatherface_album_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;
      SELECT id INTO leatherface_album_id FROM "gallery_albums" WHERE "slug" = 'leatherface' LIMIT 1;

      IF prints_cat_id IS NOT NULL AND leatherface_album_id IS NOT NULL THEN
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('Leatherface: Weathering, Skin Tones & Blood Splatter', 'weathering_and_blood_splatter.webp', '/images/art/leatherface/weathering_and_blood_splatter.webp', '/images/art/leatherface/thumbnails/weathering_and_blood_splatter.webp', prints_cat_id, leatherface_album_id, 'Leatherface', 'portrait'::"enum_gallery_images_orientation", 1330, 2364, '9/16', 11, 'published'::"enum_gallery_images_status")
        ) AS v("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        WHERE NOT EXISTS (
          SELECT 1 FROM "gallery_images" gi WHERE gi."filename" = v."filename" AND gi."album_id" = leatherface_album_id
        );
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gallery_images" 
    WHERE "filename" = 'weathering_and_blood_splatter.webp';
  `);
}
