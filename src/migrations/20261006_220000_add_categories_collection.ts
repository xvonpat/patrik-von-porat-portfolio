import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Create categories table and enum
    CREATE TYPE "public"."enum_categories_accent" AS ENUM('purple', 'cyan');

    CREATE TABLE "categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "accent" "enum_categories_accent" DEFAULT 'purple',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
    CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
    CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");

    -- 2. Seed initial canonical categories
    INSERT INTO "categories" ("name", "slug", "description", "accent") VALUES
    ('Music', 'music', 'Guitars, releases, audio production, and sonic worldbuilding.', 'purple'),
    ('Visual Art', 'visual-art', 'Graphite drawing, tattoo studies, and visual development.', 'purple'),
    ('Making', 'making', 'Resin 3D printing, miniatures, physical crafting, and repairs.', 'purple'),
    ('Technology', 'technology', 'Web systems, software architecture, and digital tooling.', 'cyan'),
    ('Process', 'process', 'Lean Six Sigma, systems thinking, continuous improvement, and methods.', 'cyan'),
    ('Personal', 'personal', 'Reflections, milestones, learning, and behind the scenes.', 'purple');

    -- 3. Add relationship column to posts
    ALTER TABLE "posts" ADD COLUMN "category_id" integer;
    ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category_id");

    -- 4. Map existing posts to their respective category ID
    UPDATE "posts" SET "category_id" = (SELECT id FROM "categories" WHERE slug = 'personal') WHERE "category"::text = 'personal' OR "category"::text = 'behind-the-scenes';
    UPDATE "posts" SET "category_id" = (SELECT id FROM "categories" WHERE slug = 'visual-art') WHERE "category"::text = 'visual-art' OR "category"::text = 'art';
    UPDATE "posts" SET "category_id" = (SELECT id FROM "categories" WHERE slug = 'making') WHERE "category"::text = 'making';
    UPDATE "posts" SET "category_id" = (SELECT id FROM "categories" WHERE slug = 'process') WHERE "category"::text = 'process' OR "category"::text = 'process-improvement';
    UPDATE "posts" SET "category_id" = (SELECT id FROM "categories" WHERE slug = 'technology') WHERE "category"::text = 'technology' OR "category"::text = 'ai' OR "category"::text = 'website-build-log';
    UPDATE "posts" SET "category_id" = (SELECT id FROM "categories" WHERE slug = 'music') WHERE "category"::text = 'music';

    -- 5. Drop legacy category enum column from posts
    ALTER TABLE "posts" DROP COLUMN "category";
    DROP TYPE "public"."enum_posts_category";

    -- 6. Ensure draft flexibility on posts (allow nulls for draft saving)
    ALTER TABLE "posts" ALTER COLUMN "slug" DROP NOT NULL;
    ALTER TABLE "posts" ALTER COLUMN "published_date" DROP NOT NULL;
    ALTER TABLE "posts" ALTER COLUMN "excerpt" DROP NOT NULL;
    ALTER TABLE "posts" ALTER COLUMN "content" DROP NOT NULL;

    -- 7. Enable RLS on categories
    ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN "category" text;
    UPDATE "posts" SET "category" = categories.slug FROM categories WHERE posts.category_id = categories.id;
    CREATE TYPE "public"."enum_posts_category" AS ENUM('music', 'visual-art', 'making', 'technology', 'process', 'personal');
    ALTER TABLE "posts" ALTER COLUMN "category" SET DATA TYPE "public"."enum_posts_category" USING "category"::"public"."enum_posts_category";
    ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_categories_id_fk";
    DROP INDEX "posts_category_idx";
    ALTER TABLE "posts" DROP COLUMN "category_id";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
    DROP INDEX "payload_locked_documents_rels_categories_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";

    ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
    DROP TABLE "categories" CASCADE;
    DROP TYPE "public"."enum_categories_accent";
  `);
}
