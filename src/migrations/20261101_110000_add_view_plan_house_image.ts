import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      house_cat_id integer;
    BEGIN
      SELECT id INTO house_cat_id FROM "gallery_categories" WHERE "slug" = '3d-house' LIMIT 1;

      IF house_cat_id IS NOT NULL THEN
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('3D House: Overhead Floor Plan View', 'view_plan.webp', '/images/projects/3d-house/view_plan.webp', '/images/projects/3d-house/thumbnails/view_plan.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1920, 1080, '16/9', 6, 'published'::"enum_gallery_images_status")
        ) AS v("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        WHERE NOT EXISTS (
          SELECT 1 FROM "gallery_images" gi WHERE gi."filename" = v."filename" AND gi."category_id" = house_cat_id
        );
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "gallery_images"
    WHERE "filename" = 'view_plan.webp';
  `);
}
