/*
  Warnings:

  - You are about to alter the column `image_url` on the `image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(300)`.
  - You are about to alter the column `image_url` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(300)`.
  - You are about to alter the column `image_url` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "image" ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "comment" SET DATA TYPE VARCHAR(500);
