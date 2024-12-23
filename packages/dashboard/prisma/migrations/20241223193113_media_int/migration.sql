/*
  Warnings:

  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `image_key` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `media_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_color_id_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ar_description" TEXT,
ADD COLUMN     "en_description" TEXT,
ADD COLUMN     "media_id" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "category_id",
DROP COLUMN "image_key",
DROP COLUMN "image_url",
ADD COLUMN     "activate_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "media_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "media",
ADD COLUMN     "media_id" TEXT;

-- AlterTable
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_pkey" PRIMARY KEY ("user_id", "product_id");

-- DropIndex
DROP INDEX "wishlist_user_id_product_id_key";

-- DropTable
DROP TABLE "image";

-- CreateTable
CREATE TABLE "product_image" (
    "color_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("product_id","color_id","media_id")
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
