import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;

      IF prints_cat_id IS NOT NULL THEN
        -- Insert Eddie the Trooper images if not already present
        INSERT INTO "gallery_images" 
          ("title", "filename", "image_url", "thumb_url", "category_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
        SELECT * FROM (VALUES
          ('Eddie the Trooper — Wash & Cure', 'IMG_0513.webp', '/images/art/eddie-the-trooper/IMG_0513.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0513.webp', prints_cat_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1536, '4/3', 1, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Resin Vat Sheet', 'IMG_0522.webp', '/images/art/eddie-the-trooper/IMG_0522.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0522.webp', prints_cat_id, 'Eddie the Trooper', 'landscape'::"enum_gallery_images_orientation", 2048, 1536, '4/3', 2, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Torso & Leg Printing', 'IMG_0560.webp', '/images/art/eddie-the-trooper/IMG_0560.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0560.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 3, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Bust Assembly Test', 'IMG_0572.webp', '/images/art/eddie-the-trooper/IMG_0572.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0572.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 4, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Head & Teeth Detail', 'IMG_0578.webp', '/images/art/eddie-the-trooper/IMG_0578.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0578.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 5, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Vat Cleaning Procedure', 'IMG_0607.webp', '/images/art/eddie-the-trooper/IMG_0607.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0607.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 6, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Arm & Sleeve on Build Plate', 'IMG_0612.webp', '/images/art/eddie-the-trooper/IMG_0612.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0612.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 7, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Support Failure Inspection', 'IMG_0617.webp', '/images/art/eddie-the-trooper/IMG_0617.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0617.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 8, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Heavy Support Structure', 'IMG_0686.webp', '/images/art/eddie-the-trooper/IMG_0686.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0686.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 9, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Diorama Base Lattice', 'IMG_0690.webp', '/images/art/eddie-the-trooper/IMG_0690.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0690.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1536, 2048, '3/4', 10, 'published'::"enum_gallery_images_status"),
          ('Eddie the Trooper — Full Component Breakdown', 'IMG_0693.webp', '/images/art/eddie-the-trooper/IMG_0693.webp', '/images/art/eddie-the-trooper/thumbnails/IMG_0693.webp', prints_cat_id, 'Eddie the Trooper', 'portrait'::"enum_gallery_images_orientation", 1080, 1920, '9/16', 11, 'published'::"enum_gallery_images_status")
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
    DELETE FROM "gallery_images" WHERE "project" = 'Eddie the Trooper';
  `);
}
