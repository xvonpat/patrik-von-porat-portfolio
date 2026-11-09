import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Delete girls_posing_stone_wall image
    DELETE FROM "gallery_images" WHERE "filename" = 'girls_posing_stone_wall.jpg';

    -- 2. Re-sequence order numbers for Summer 2026 images following order 18
    UPDATE "gallery_images" SET "order" = 19 WHERE "filename" = 'children_petting_farm_pig.jpg';
    UPDATE "gallery_images" SET "order" = 20 WHERE "filename" = 'children_with_calf_and_sheep.jpg';
    UPDATE "gallery_images" SET "order" = 21 WHERE "filename" = 'wooden_dugout_canoe_paddling.jpg';
    UPDATE "gallery_images" SET "order" = 22 WHERE "filename" = 'pink_popsicle_summer_treat.jpg';
    UPDATE "gallery_images" SET "order" = 23 WHERE "filename" = 'lake_beach_storm_clouds.jpg';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      summer_cat_id integer;
    BEGIN
      SELECT id INTO summer_cat_id FROM "gallery_categories" WHERE slug = 'summer-2026' LIMIT 1;
      IF summer_cat_id IS NOT NULL THEN
        INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status")
        VALUES ('Summer 2026: Girls Posing by Stone Wall', 'girls_posing_stone_wall.jpg', '/images/gallery/images/large/girls_posing_stone_wall.jpg', '/images/gallery/images/thumbnails/girls_posing_stone_wall.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 19, 'published');

        UPDATE "gallery_images" SET "order" = 20 WHERE "filename" = 'children_petting_farm_pig.jpg';
        UPDATE "gallery_images" SET "order" = 21 WHERE "filename" = 'children_with_calf_and_sheep.jpg';
        UPDATE "gallery_images" SET "order" = 22 WHERE "filename" = 'wooden_dugout_canoe_paddling.jpg';
        UPDATE "gallery_images" SET "order" = 23 WHERE "filename" = 'pink_popsicle_summer_treat.jpg';
        UPDATE "gallery_images" SET "order" = 24 WHERE "filename" = 'lake_beach_storm_clouds.jpg';
      END IF;
    END $$;
  `);
}
