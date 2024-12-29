-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_id_fkey";

-- DropIndex
DROP INDEX "category_ar_name_key";

-- DropIndex
DROP INDEX "category_en_name_key";

-- DropIndex
DROP INDEX "product_ar_name_key";

-- DropIndex
DROP INDEX "product_en_name_key";

-- DropIndex
DROP INDEX "session_token_key";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "ar_name" SET DATA TYPE TEXT,
ALTER COLUMN "en_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "image" ALTER COLUMN "image_key" SET DATA TYPE TEXT,
ALTER COLUMN "image_url" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "ar_name" SET DATA TYPE TEXT,
ALTER COLUMN "en_name" SET DATA TYPE TEXT,
ALTER COLUMN "ar_description" SET DATA TYPE TEXT,
ALTER COLUMN "en_description" SET DATA TYPE TEXT,
ALTER COLUMN "image_key" SET DATA TYPE TEXT,
ALTER COLUMN "image_url" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
