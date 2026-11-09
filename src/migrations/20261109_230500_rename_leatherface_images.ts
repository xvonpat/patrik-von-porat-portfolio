import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "gallery_albums"
    SET "cover_url" = '/images/art/leatherface/thumbnails/apron_and_base_painted.webp'
    WHERE "slug" = 'leatherface';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Wash & Cure Parts',
      "filename" = 'wash_and_cure.webp',
      "image_url" = '/images/art/leatherface/wash_and_cure.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/wash_and_cure.webp'
    WHERE "filename" = 'IMG_1341.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Head Sculpt Detail',
      "filename" = 'head_sculpt.webp',
      "image_url" = '/images/art/leatherface/head_sculpt.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/head_sculpt.webp'
    WHERE "filename" = 'IMG_1342.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Parts Mounted for Priming',
      "filename" = 'parts_on_clips.webp',
      "image_url" = '/images/art/leatherface/parts_on_clips.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/parts_on_clips.webp'
    WHERE "filename" = 'IMG_1347.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Wooden Plank Base & Boots',
      "filename" = 'wooden_base_and_boots.webp',
      "image_url" = '/images/art/leatherface/wooden_base_and_boots.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/wooden_base_and_boots.webp'
    WHERE "filename" = 'IMG_1393.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Trousers Resin Print',
      "filename" = 'trousers_print.webp',
      "image_url" = '/images/art/leatherface/trousers_print.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/trousers_print.webp'
    WHERE "filename" = 'IMG_1397.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Black Primer Airbrush Prep',
      "filename" = 'black_primer_parts.webp',
      "image_url" = '/images/art/leatherface/black_primer_parts.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/black_primer_parts.webp'
    WHERE "filename" = 'IMG_1400.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Primed Figure Assembly with Chainsaw',
      "filename" = 'primed_figure_assembly.webp',
      "image_url" = '/images/art/leatherface/primed_figure_assembly.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/primed_figure_assembly.webp'
    WHERE "filename" = 'IMG_1407.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Zenithal Highlighting & Apron Fit',
      "filename" = 'zenithal_highlighting.webp',
      "image_url" = '/images/art/leatherface/zenithal_highlighting.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/zenithal_highlighting.webp'
    WHERE "filename" = 'IMG_1427.webp';

    UPDATE "gallery_images"
    SET
      "title" = 'Leatherface: Base, Trousers & Apron Painting',
      "filename" = 'apron_and_base_painted.webp',
      "image_url" = '/images/art/leatherface/apron_and_base_painted.webp',
      "thumb_url" = '/images/art/leatherface/thumbnails/apron_and_base_painted.webp'
    WHERE "filename" = 'IMG_1446.webp';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "gallery_albums"
    SET "cover_url" = '/images/art/leatherface/thumbnails/IMG_1341.webp'
    WHERE "slug" = 'leatherface';

    UPDATE "gallery_images" SET "filename" = 'IMG_1341.webp', "image_url" = '/images/art/leatherface/IMG_1341.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1341.webp' WHERE "filename" = 'wash_and_cure.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1342.webp', "image_url" = '/images/art/leatherface/IMG_1342.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1342.webp' WHERE "filename" = 'head_sculpt.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1347.webp', "image_url" = '/images/art/leatherface/IMG_1347.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1347.webp' WHERE "filename" = 'parts_on_clips.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1393.webp', "image_url" = '/images/art/leatherface/IMG_1393.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1393.webp' WHERE "filename" = 'wooden_base_and_boots.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1397.webp', "image_url" = '/images/art/leatherface/IMG_1397.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1397.webp' WHERE "filename" = 'trousers_print.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1400.webp', "image_url" = '/images/art/leatherface/IMG_1400.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1400.webp' WHERE "filename" = 'black_primer_parts.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1407.webp', "image_url" = '/images/art/leatherface/IMG_1407.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1407.webp' WHERE "filename" = 'primed_figure_assembly.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1427.webp', "image_url" = '/images/art/leatherface/IMG_1427.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1427.webp' WHERE "filename" = 'zenithal_highlighting.webp';
    UPDATE "gallery_images" SET "filename" = 'IMG_1446.webp', "image_url" = '/images/art/leatherface/IMG_1446.webp', "thumb_url" = '/images/art/leatherface/thumbnails/IMG_1446.webp' WHERE "filename" = 'apron_and_base_painted.webp';
  `);
}
