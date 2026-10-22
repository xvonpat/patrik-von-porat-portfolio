import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    DECLARE
      prints_cat_id integer;
      vader_album_id integer;
    BEGIN
      SELECT id INTO prints_cat_id FROM "gallery_categories" WHERE "slug" = '3d-prints' LIMIT 1;

      IF prints_cat_id IS NOT NULL THEN
        -- Insert or retrieve Darth Vader Diorama album
        INSERT INTO "gallery_albums" ("title", "slug", "collection_id", "cover_url", "description", "order", "status")
        VALUES (
          'Darth Vader Diorama',
          'darth-vader-diorama',
          prints_cat_id,
          '/images/art/darth-vader-diorama/thumbnails/IMG_1125.webp',
          'Resin 3D print and diorama build featuring Darth Vader and Stormtroopers',
          2,
          'published'
        )
        ON CONFLICT ("slug") DO UPDATE SET 
          "collection_id" = prints_cat_id,
          "cover_url" = EXCLUDED.cover_url,
          "description" = EXCLUDED.description
        RETURNING id INTO vader_album_id;

        IF vader_album_id IS NULL THEN
          SELECT id INTO vader_album_id FROM "gallery_albums" WHERE "slug" = 'darth-vader-diorama' LIMIT 1;
        END IF;

        IF vader_album_id IS NOT NULL THEN
          INSERT INTO "gallery_images" 
            ("title", "filename", "image_url", "thumb_url", "category_id", "album_id", "project", "orientation", "width", "height", "aspect_ratio", "order", "status")
          SELECT * FROM (VALUES
            ('Darth Vader Diorama: Full Assembly Dry Fit', 'IMG_1125.webp', '/images/art/darth-vader-diorama/IMG_1125.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1125.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'portrait'::"enum_gallery_images_orientation", 1152, 2048, '9/16', 1, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Scenic Base & Stormtrooper Squad', 'IMG_1127.webp', '/images/art/darth-vader-diorama/IMG_1127.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1127.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 2, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Torso & Armor Detail', 'IMG_1131.webp', '/images/art/darth-vader-diorama/IMG_1131.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1131.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 3, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Force Reach Gauntlet', 'IMG_1132.webp', '/images/art/darth-vader-diorama/IMG_1132.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1132.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 4, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Lower Body & Quilted Trousers', 'IMG_1134.webp', '/images/art/darth-vader-diorama/IMG_1134.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1134.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 5, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Rock Terrain Texture & Drybrushing', 'IMG_1136.webp', '/images/art/darth-vader-diorama/IMG_1136.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1136.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 6, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Base Assembly & Workbench Layout', 'IMG_1137.webp', '/images/art/darth-vader-diorama/IMG_1137.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1137.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 7, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Resin E-11 Blaster & Hands', 'IMG_1140.webp', '/images/art/darth-vader-diorama/IMG_1140.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1140.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 8, 'published'::"enum_gallery_images_status"),
            ('Darth Vader Diorama: Upper Body Assembly & Priming Prep', 'IMG_1143.webp', '/images/art/darth-vader-diorama/IMG_1143.webp', '/images/art/darth-vader-diorama/thumbnails/IMG_1143.webp', prints_cat_id, vader_album_id, 'Darth Vader Diorama', 'landscape'::"enum_gallery_images_orientation", 2048, 1152, '16/9', 9, 'published'::"enum_gallery_images_status")
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
    WHERE "filename" IN (
      'IMG_1125.webp', 'IMG_1127.webp', 'IMG_1131.webp', 'IMG_1132.webp',
      'IMG_1134.webp', 'IMG_1136.webp', 'IMG_1137.webp', 'IMG_1140.webp',
      'IMG_1143.webp'
    );
    DELETE FROM "gallery_albums" WHERE "slug" = 'darth-vader-diorama';
  `);
}
