import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
      vader_album_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;
      SELECT id INTO vader_album_id FROM "gallery_albums" WHERE "slug" = 'darth-vader-diorama' LIMIT 1;

      IF prints_cat_id IS NOT NULL AND vader_album_id IS NOT NULL THEN
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('Darth Vader Diorama: Stormtrooper Helmet & Armor Detailing', 'IMG_1179.webp', '/images/art/darth-vader-diorama/IMG_1179.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1179.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 14, 'published'::"enum_gallery_images_status")
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
    WHERE "filename" IN ('IMG_1179.webp');
  `);
}
