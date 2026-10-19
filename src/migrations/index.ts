import * as migration_20260527_202303 from './20260527_202303';
import * as migration_20260527_203823 from './20260527_203823';
import * as migration_20260527_204729 from './20260527_204729';
import * as migration_20260527_205225 from './20260527_205225';
import * as migration_20260527_205507 from './20260527_205507';
import * as migration_20260527_205655 from './20260527_205655';
import * as migration_20260601_210827_add_seo_fields_to_posts from './20260601_210827_add_seo_fields_to_posts';
import * as migration_20260601_212030_add_admin_links_collection from './20260601_212030_add_admin_links_collection';
import * as migration_20260616_204349_enable_rls_on_all_tables from './20260616_204349_enable_rls_on_all_tables';
import * as migration_20261006_220000_add_categories_collection from './20261006_220000_add_categories_collection';
import * as migration_20261010_193000_add_gallery_collections from './20261010_193000_add_gallery_collections';
import * as migration_20261010_220000_add_eddie_the_trooper_images from './20261010_220000_add_eddie_the_trooper_images';
import * as migration_20261010_223000_add_more_eddie_images from './20261010_223000_add_more_eddie_images';
import * as migration_20261011_003000_add_gallery_albums from './20261011_003000_add_gallery_albums';
import * as migration_20261011_131500_add_priming_eddie_images from './20261011_131500_add_priming_eddie_images';
import * as migration_20261013_221500_enable_rls_gallery_albums from './20261013_221500_enable_rls_gallery_albums';
import * as migration_20261014_200500_add_base_prep_eddie_images from './20261014_200500_add_base_prep_eddie_images';
import * as migration_20261015_191000_add_dry_fit_eddie_images from './20261015_191000_add_dry_fit_eddie_images';
import * as migration_20261016_181500_add_grey_primer_eddie_images from './20261016_181500_add_grey_primer_eddie_images';
import * as migration_20261017_000000_add_site_settings_global from './20261017_000000_add_site_settings_global';
import * as migration_20261017_010000_add_digital_eclipse_v2 from './20261017_010000_add_digital_eclipse_v2';
import * as migration_20261017_200000_add_gallery_image_to_posts from './20261017_200000_add_gallery_image_to_posts';
import * as migration_20261017_223000_add_harmonic_nexus from './20261017_223000_add_harmonic_nexus';
import * as migration_20261017_232500_add_trousers_painting_eddie_image from './20261017_232500_add_trousers_painting_eddie_image';
import * as migration_20261019_192000_add_nameplate_and_torso_eddie_images from './20261019_192000_add_nameplate_and_torso_eddie_images';
import * as migration_20261019_210000_add_chladni_plate from './20261019_210000_add_chladni_plate';
import * as migration_20261019_220000_add_ink_in_water from './20261019_220000_add_ink_in_water';

export const migrations = [
  {
    up: migration_20260527_202303.up,
    down: migration_20260527_202303.down,
    name: '20260527_202303',
  },
  {
    up: migration_20260527_203823.up,
    down: migration_20260527_203823.down,
    name: '20260527_203823',
  },
  {
    up: migration_20260527_204729.up,
    down: migration_20260527_204729.down,
    name: '20260527_204729',
  },
  {
    up: migration_20260527_205225.up,
    down: migration_20260527_205225.down,
    name: '20260527_205225',
  },
  {
    up: migration_20260527_205507.up,
    down: migration_20260527_205507.down,
    name: '20260527_205507',
  },
  {
    up: migration_20260527_205655.up,
    down: migration_20260527_205655.down,
    name: '20260527_205655',
  },
  {
    up: migration_20260601_210827_add_seo_fields_to_posts.up,
    down: migration_20260601_210827_add_seo_fields_to_posts.down,
    name: '20260601_210827_add_seo_fields_to_posts',
  },
  {
    up: migration_20260601_212030_add_admin_links_collection.up,
    down: migration_20260601_212030_add_admin_links_collection.down,
    name: '20260601_212030_add_admin_links_collection',
  },
  {
    up: migration_20260616_204349_enable_rls_on_all_tables.up,
    down: migration_20260616_204349_enable_rls_on_all_tables.down,
    name: '20260616_204349_enable_rls_on_all_tables',
  },
  {
    up: migration_20261006_220000_add_categories_collection.up,
    down: migration_20261006_220000_add_categories_collection.down,
    name: '20261006_220000_add_categories_collection',
  },
  {
    up: migration_20261010_193000_add_gallery_collections.up,
    down: migration_20261010_193000_add_gallery_collections.down,
    name: '20261010_193000_add_gallery_collections',
  },
  {
    up: migration_20261010_220000_add_eddie_the_trooper_images.up,
    down: migration_20261010_220000_add_eddie_the_trooper_images.down,
    name: '20261010_220000_add_eddie_the_trooper_images',
  },
  {
    up: migration_20261010_223000_add_more_eddie_images.up,
    down: migration_20261010_223000_add_more_eddie_images.down,
    name: '20261010_223000_add_more_eddie_images',
  },
  {
    up: migration_20261011_003000_add_gallery_albums.up,
    down: migration_20261011_003000_add_gallery_albums.down,
    name: '20261011_003000_add_gallery_albums',
  },
  {
    up: migration_20261011_131500_add_priming_eddie_images.up,
    down: migration_20261011_131500_add_priming_eddie_images.down,
    name: '20261011_131500_add_priming_eddie_images',
  },
  {
    up: migration_20261013_221500_enable_rls_gallery_albums.up,
    down: migration_20261013_221500_enable_rls_gallery_albums.down,
    name: '20261013_221500_enable_rls_gallery_albums',
  },
  {
    up: migration_20261014_200500_add_base_prep_eddie_images.up,
    down: migration_20261014_200500_add_base_prep_eddie_images.down,
    name: '20261014_200500_add_base_prep_eddie_images',
  },
  {
    up: migration_20261015_191000_add_dry_fit_eddie_images.up,
    down: migration_20261015_191000_add_dry_fit_eddie_images.down,
    name: '20261015_191000_add_dry_fit_eddie_images',
  },
  {
    up: migration_20261016_181500_add_grey_primer_eddie_images.up,
    down: migration_20261016_181500_add_grey_primer_eddie_images.down,
    name: '20261016_181500_add_grey_primer_eddie_images',
  },
  {
    up: migration_20261017_000000_add_site_settings_global.up,
    down: migration_20261017_000000_add_site_settings_global.down,
    name: '20261017_000000_add_site_settings_global',
  },
  {
    up: migration_20261017_010000_add_digital_eclipse_v2.up,
    down: migration_20261017_010000_add_digital_eclipse_v2.down,
    name: '20261017_010000_add_digital_eclipse_v2',
  },
  {
    up: migration_20261017_200000_add_gallery_image_to_posts.up,
    down: migration_20261017_200000_add_gallery_image_to_posts.down,
    name: '20261017_200000_add_gallery_image_to_posts',
  },
  {
    up: migration_20261017_223000_add_harmonic_nexus.up,
    down: migration_20261017_223000_add_harmonic_nexus.down,
    name: '20261017_223000_add_harmonic_nexus',
  },
  {
    up: migration_20261017_232500_add_trousers_painting_eddie_image.up,
    down: migration_20261017_232500_add_trousers_painting_eddie_image.down,
    name: '20261017_232500_add_trousers_painting_eddie_image',
  },
  {
    up: migration_20261019_192000_add_nameplate_and_torso_eddie_images.up,
    down: migration_20261019_192000_add_nameplate_and_torso_eddie_images.down,
    name: '20261019_192000_add_nameplate_and_torso_eddie_images',
  },
  {
    up: migration_20261019_210000_add_chladni_plate.up,
    down: migration_20261019_210000_add_chladni_plate.down,
    name: '20261019_210000_add_chladni_plate',
  },
  {
    up: migration_20261019_220000_add_ink_in_water.up,
    down: migration_20261019_220000_add_ink_in_water.down,
    name: '20261019_220000_add_ink_in_water',
  },
];
