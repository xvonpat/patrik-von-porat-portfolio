import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Update Existing Summer 2026 Images
    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Tobacco Leaf Macro',
      "filename" = 'tobacco_leaf_macro.jpg',
      "image_url" = '/images/gallery/images/large/tobacco_leaf_macro.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/tobacco_leaf_macro.jpg'
    WHERE "filename" = 'IMG_1552.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Leaf Texture Detail',
      "filename" = 'leaf_texture_detail.jpg',
      "image_url" = '/images/gallery/images/large/leaf_texture_detail.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/leaf_texture_detail.jpg'
    WHERE "filename" = 'IMG_1553.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Tobacco Plants Garden',
      "filename" = 'tobacco_plants_garden.jpg',
      "image_url" = '/images/gallery/images/large/tobacco_plants_garden.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/tobacco_plants_garden.jpg'
    WHERE "filename" = 'IMG_1555.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Green Apples on Branch',
      "filename" = 'green_apples_on_branch.jpg',
      "image_url" = '/images/gallery/images/large/green_apples_on_branch.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/green_apples_on_branch.jpg'
    WHERE "filename" = 'IMG_1556.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Lawn Grass Ground Level',
      "filename" = 'lawn_grass_ground_level.jpg',
      "image_url" = '/images/gallery/images/large/lawn_grass_ground_level.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/lawn_grass_ground_level.jpg'
    WHERE "filename" = 'IMG_1558.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Summer Lawn Blades',
      "filename" = 'summer_lawn_blades.jpg',
      "image_url" = '/images/gallery/images/large/summer_lawn_blades.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/summer_lawn_blades.jpg'
    WHERE "filename" = 'IMG_1559.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Kawasaki Motorcycle Lakeside',
      "filename" = 'kawasaki_motorcycle_lakeside.jpg',
      "image_url" = '/images/gallery/images/large/kawasaki_motorcycle_lakeside.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/kawasaki_motorcycle_lakeside.jpg'
    WHERE "filename" = 'IMG_1601.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Summer Lake Reeds',
      "filename" = 'summer_lake_reeds.jpg',
      "image_url" = '/images/gallery/images/large/summer_lake_reeds.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/summer_lake_reeds.jpg'
    WHERE "filename" = 'IMG_1610.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Purple Loosestrife Wildflowers',
      "filename" = 'purple_loosestrife_wildflowers.jpg',
      "image_url" = '/images/gallery/images/large/purple_loosestrife_wildflowers.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/purple_loosestrife_wildflowers.jpg'
    WHERE "filename" = 'IMG_1612.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Wildflowers Shoreline Bloom',
      "filename" = 'wildflowers_shoreline_bloom.jpg',
      "image_url" = '/images/gallery/images/large/wildflowers_shoreline_bloom.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/wildflowers_shoreline_bloom.jpg'
    WHERE "filename" = 'IMG_1626.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Lakeside Shoreline View',
      "filename" = 'lakeside_shoreline_view.jpg',
      "image_url" = '/images/gallery/images/large/lakeside_shoreline_view.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/lakeside_shoreline_view.jpg'
    WHERE "filename" = 'IMG_1630.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Lake Vättern Waves',
      "filename" = 'lake_vattern_waves.jpg',
      "image_url" = '/images/gallery/images/large/lake_vattern_waves.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/lake_vattern_waves.jpg'
    WHERE "filename" = 'IMG_1649.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Archipelago Rocky Coast',
      "filename" = 'archipelago_rocky_coast.jpg',
      "image_url" = '/images/gallery/images/large/archipelago_rocky_coast.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/archipelago_rocky_coast.jpg'
    WHERE "filename" = 'IMG_0024.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Patio Deck Coastal View',
      "filename" = 'patio_deck_coastal_view.jpg',
      "image_url" = '/images/gallery/images/large/patio_deck_coastal_view.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/patio_deck_coastal_view.jpg'
    WHERE "filename" = 'IMG_0094.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Open Country Road',
      "filename" = 'open_country_road.jpg',
      "image_url" = '/images/gallery/images/large/open_country_road.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/open_country_road.jpg'
    WHERE "filename" = 'IMG_1658.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Cozy Porch Summer Bed',
      "filename" = 'cozy_porch_summer_bed.jpg',
      "image_url" = '/images/gallery/images/large/cozy_porch_summer_bed.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/cozy_porch_summer_bed.jpg'
    WHERE "filename" = 'IMG_0137.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Torpa Stenhus Grounds',
      "filename" = 'torpa_stenhus_grounds.jpg',
      "image_url" = '/images/gallery/images/large/torpa_stenhus_grounds.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/torpa_stenhus_grounds.jpg'
    WHERE "filename" = 'IMG_0149.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Torpa Stenhus Stone Rampart',
      "filename" = 'torpa_stenhus_stone_rampart.jpg',
      "image_url" = '/images/gallery/images/large/torpa_stenhus_stone_rampart.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/torpa_stenhus_stone_rampart.jpg'
    WHERE "filename" = 'IMG_0191.jpg';

    UPDATE "gallery_images" SET
      "title" = 'Summer 2026: Lake Beach Storm Clouds',
      "filename" = 'lake_beach_storm_clouds.jpg',
      "image_url" = '/images/gallery/images/large/lake_beach_storm_clouds.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/lake_beach_storm_clouds.jpg'
    WHERE "filename" = 'IMG_0312.jpg';

    -- 2. Insert Missing Summer 2026 Images If Not Present
    DO $$
    DECLARE
      summer_cat_id integer;
    BEGIN
      SELECT id INTO summer_cat_id FROM "gallery_categories" WHERE slug = 'summer-2026' LIMIT 1;
      IF summer_cat_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM "gallery_images" WHERE filename = 'girls_posing_stone_wall.jpg') THEN
          INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status")
          VALUES ('Summer 2026: Girls Posing by Stone Wall', 'girls_posing_stone_wall.jpg', '/images/gallery/images/large/girls_posing_stone_wall.jpg', '/images/gallery/images/thumbnails/girls_posing_stone_wall.jpg', summer_cat_id, 'landscape', 1200, 675, '16/9', 19, 'published');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "gallery_images" WHERE filename = 'children_petting_farm_pig.jpg') THEN
          INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status")
          VALUES ('Summer 2026: Children Petting Farm Pig', 'children_petting_farm_pig.jpg', '/images/gallery/images/large/children_petting_farm_pig.jpg', '/images/gallery/images/thumbnails/children_petting_farm_pig.jpg', summer_cat_id, 'landscape', 1200, 900, '4/3', 20, 'published');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "gallery_images" WHERE filename = 'children_with_calf_and_sheep.jpg') THEN
          INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status")
          VALUES ('Summer 2026: Children with Calf and Sheep', 'children_with_calf_and_sheep.jpg', '/images/gallery/images/large/children_with_calf_and_sheep.jpg', '/images/gallery/images/thumbnails/children_with_calf_and_sheep.jpg', summer_cat_id, 'landscape', 1200, 900, '4/3', 21, 'published');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "gallery_images" WHERE filename = 'wooden_dugout_canoe_paddling.jpg') THEN
          INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status")
          VALUES ('Summer 2026: Wooden Dugout Canoe Paddling', 'wooden_dugout_canoe_paddling.jpg', '/images/gallery/images/large/wooden_dugout_canoe_paddling.jpg', '/images/gallery/images/thumbnails/wooden_dugout_canoe_paddling.jpg', summer_cat_id, 'portrait', 900, 1200, '3/4', 22, 'published');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "gallery_images" WHERE filename = 'pink_popsicle_summer_treat.jpg') THEN
          INSERT INTO "gallery_images" ("title", "filename", "image_url", "thumb_url", "category_id", "orientation", "width", "height", "aspect_ratio", "order", "status")
          VALUES ('Summer 2026: Pink Popsicle Summer Treat', 'pink_popsicle_summer_treat.jpg', '/images/gallery/images/large/pink_popsicle_summer_treat.jpg', '/images/gallery/images/thumbnails/pink_popsicle_summer_treat.jpg', summer_cat_id, 'portrait', 900, 1200, '3/4', 23, 'published');
        END IF;
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "gallery_images" SET
      "title" = 'IMG_1552',
      "filename" = 'IMG_1552.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1552.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1552.jpg'
    WHERE "filename" = 'tobacco_leaf_macro.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1553',
      "filename" = 'IMG_1553.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1553.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1553.jpg'
    WHERE "filename" = 'leaf_texture_detail.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1555',
      "filename" = 'IMG_1555.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1555.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1555.jpg'
    WHERE "filename" = 'tobacco_plants_garden.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1556',
      "filename" = 'IMG_1556.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1556.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1556.jpg'
    WHERE "filename" = 'green_apples_on_branch.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1558',
      "filename" = 'IMG_1558.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1558.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1558.jpg'
    WHERE "filename" = 'lawn_grass_ground_level.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1559',
      "filename" = 'IMG_1559.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1559.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1559.jpg'
    WHERE "filename" = 'summer_lawn_blades.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1601',
      "filename" = 'IMG_1601.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1601.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1601.jpg'
    WHERE "filename" = 'kawasaki_motorcycle_lakeside.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1610',
      "filename" = 'IMG_1610.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1610.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1610.jpg'
    WHERE "filename" = 'summer_lake_reeds.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1612',
      "filename" = 'IMG_1612.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1612.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1612.jpg'
    WHERE "filename" = 'purple_loosestrife_wildflowers.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1626',
      "filename" = 'IMG_1626.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1626.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1626.jpg'
    WHERE "filename" = 'wildflowers_shoreline_bloom.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1630',
      "filename" = 'IMG_1630.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1630.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1630.jpg'
    WHERE "filename" = 'lakeside_shoreline_view.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1649',
      "filename" = 'IMG_1649.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1649.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1649.jpg'
    WHERE "filename" = 'lake_vattern_waves.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_0024',
      "filename" = 'IMG_0024.jpg',
      "image_url" = '/images/gallery/images/large/IMG_0024.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_0024.jpg'
    WHERE "filename" = 'archipelago_rocky_coast.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_0094',
      "filename" = 'IMG_0094.jpg',
      "image_url" = '/images/gallery/images/large/IMG_0094.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_0094.jpg'
    WHERE "filename" = 'patio_deck_coastal_view.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_1658',
      "filename" = 'IMG_1658.jpg',
      "image_url" = '/images/gallery/images/large/IMG_1658.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_1658.jpg'
    WHERE "filename" = 'open_country_road.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_0137',
      "filename" = 'IMG_0137.jpg',
      "image_url" = '/images/gallery/images/large/IMG_0137.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_0137.jpg'
    WHERE "filename" = 'cozy_porch_summer_bed.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_0149',
      "filename" = 'IMG_0149.jpg',
      "image_url" = '/images/gallery/images/large/IMG_0149.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_0149.jpg'
    WHERE "filename" = 'torpa_stenhus_grounds.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_0191',
      "filename" = 'IMG_0191.jpg',
      "image_url" = '/images/gallery/images/large/IMG_0191.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_0191.jpg'
    WHERE "filename" = 'torpa_stenhus_stone_rampart.jpg';

    UPDATE "gallery_images" SET
      "title" = 'IMG_0312',
      "filename" = 'IMG_0312.jpg',
      "image_url" = '/images/gallery/images/large/IMG_0312.jpg',
      "thumb_url" = '/images/gallery/images/thumbnails/IMG_0312.jpg'
    WHERE "filename" = 'lake_beach_storm_clouds.jpg';
  `);
}
