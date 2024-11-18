/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `user_id` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `wishlist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_user_id_fkey";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("user_id", "stock_id");

-- AlterTable
ALTER TABLE "order" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_id", "address_id");

-- AlterTable
ALTER TABLE "wishlist" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_product_id_key" ON "wishlist"("user_id", "product_id");
