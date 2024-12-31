/*
  Warnings:

  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_media_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_media_id_fkey";

-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_media_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_media_id_fkey";

-- DropTable
DROP TABLE "media";
