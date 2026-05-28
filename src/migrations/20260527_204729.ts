import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_category" AS ENUM('music', 'art', 'ai', 'process-improvement', 'behind-the-scenes', 'website-build-log');
  ALTER TABLE "posts" ADD COLUMN "category" "enum_posts_category" NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "category";
  DROP TYPE "public"."enum_posts_category";`)
}
