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
          ('3D House: Entrance and Exterior Facade', 'exterior_entrance.webp', '/images/projects/3d-house/exterior_entrance.webp', '/images/projects/3d-house/thumbnails/exterior_entrance.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1920, 1080, '16/9', 7, 'published'::"enum_gallery_images_status"),
          ('3D House: Main Floor Plan Overview', 'floor_plan_overview.webp', '/images/projects/3d-house/floor_plan_overview.webp', '/images/projects/3d-house/thumbnails/floor_plan_overview.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1920, 1080, '16/9', 8, 'published'::"enum_gallery_images_status"),
          ('3D House: Kitchen and Dining Area Interior', 'kitchen_dining.webp', '/images/projects/3d-house/kitchen_dining.webp', '/images/projects/3d-house/thumbnails/kitchen_dining.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1920, 1080, '16/9', 9, 'published'::"enum_gallery_images_status"),
          ('3D House: Living Room Interior', 'living_room.webp', '/images/projects/3d-house/living_room.webp', '/images/projects/3d-house/thumbnails/living_room.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1920, 1080, '16/9', 10, 'published'::"enum_gallery_images_status"),
          ('3D House: Master Bedroom Interior', 'bedroom.webp', '/images/projects/3d-house/bedroom.webp', '/images/projects/3d-house/thumbnails/bedroom.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1500, 1125, '4/3', 11, 'published'::"enum_gallery_images_status")
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
    WHERE "filename" IN (
      'exterior_entrance.webp',
      'floor_plan_overview.webp',
      'kitchen_dining.webp',
      'living_room.webp',
      'bedroom.webp'
    );
  `);
}
