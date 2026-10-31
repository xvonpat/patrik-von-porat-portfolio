import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      house_cat_id integer;
    BEGIN
      -- Insert or retrieve 3D House category
      INSERT INTO "gallery_categories" ("name", "slug", "eyebrow", "description", "order", "status")
      VALUES (
        '3D House',
        '3d-house',
        'Digital Models',
        '3D floor plans and architectural spatial modeling',
        5,
        'published'
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "name" = EXCLUDED.name,
        "eyebrow" = EXCLUDED.eyebrow,
        "description" = EXCLUDED.description,
        "order" = EXCLUDED.order,
        "status" = EXCLUDED.status
      RETURNING id INTO house_cat_id;

      IF house_cat_id IS NULL THEN
        SELECT id INTO house_cat_id FROM "gallery_categories" WHERE "slug" = '3d-house' LIMIT 1;
      END IF;

      IF house_cat_id IS NOT NULL THEN
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('3D House: Architectural Floor Plan Blueprint', 'drawing.webp', '/images/projects/3d-house/drawing.webp', '/images/projects/3d-house/thumbnails/drawing.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 2364, 1330, '16/9', 1, 'published'::"enum_gallery_images_status"),
          ('3D House: Blueprint and Model Alignment', 'drawing_and_model.webp', '/images/projects/3d-house/drawing_and_model.webp', '/images/projects/3d-house/thumbnails/drawing_and_model.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1600, 1000, '16/10', 2, 'published'::"enum_gallery_images_status"),
          ('3D House: Main Floor Spatial Model', 'featured_main_floor.webp', '/images/projects/3d-house/featured_main_floor.webp', '/images/projects/3d-house/thumbnails/featured_main_floor.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1920, 1080, '16/9', 3, 'published'::"enum_gallery_images_status"),
          ('3D House: Basement Isometric Layout', 'basement.webp', '/images/projects/3d-house/basement.webp', '/images/projects/3d-house/thumbnails/basement.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1600, 1000, '16/10', 4, 'published'::"enum_gallery_images_status"),
          ('3D House: Exterior Perspective View', 'street_view.webp', '/images/projects/3d-house/street_view.webp', '/images/projects/3d-house/thumbnails/street_view.webp', house_cat_id, NULL::integer, '3D House', 'landscape'::"enum_gallery_images_orientation", 1600, 900, '16/9', 5, 'published'::"enum_gallery_images_status")
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
    DO $$
    DECLARE
      house_cat_id integer;
    BEGIN
      SELECT id INTO house_cat_id FROM "gallery_categories" WHERE "slug" = '3d-house' LIMIT 1;

      IF house_cat_id IS NOT NULL THEN
        DELETE FROM "gallery_images" 
        WHERE "category_id" = house_cat_id;

        DELETE FROM "gallery_categories"
        WHERE "id" = house_cat_id;
      END IF;
    END $$;
  `);
}
