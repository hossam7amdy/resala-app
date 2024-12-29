/*
  Warnings:

  - The values [SUBSCRIBED,NOT_SUBSCRIBED,UNSUBSCRIBED] on the enum `marketing_state` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,MODERATOR,STAFF,USER,CUSTOMER] on the enum `role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `_DiscountToProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `discount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `amount` on the `discount` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - The primary key for the `image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `subtotal` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - You are about to alter the column `discount` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - You are about to alter the column `total` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - The primary key for the `order_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `unit_price` on the `order_item` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shipping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cost` on the `shipping` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - The primary key for the `size` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_email_verified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `is_phone_verified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lang` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `verification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[number]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "marketing_state_new" AS ENUM ('subscribed', 'unsubscribed', 'not_subscribed');
ALTER TABLE "user" ALTER COLUMN "email_marketing_state" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "sms_marketing_state" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "email_marketing_state" TYPE "marketing_state_new" USING ("email_marketing_state"::text::"marketing_state_new");
ALTER TABLE "user" ALTER COLUMN "sms_marketing_state" TYPE "marketing_state_new" USING ("sms_marketing_state"::text::"marketing_state_new");
ALTER TYPE "marketing_state" RENAME TO "marketing_state_old";
ALTER TYPE "marketing_state_new" RENAME TO "marketing_state";
DROP TYPE "marketing_state_old";
ALTER TABLE "user" ALTER COLUMN "email_marketing_state" SET DEFAULT 'not_subscribed';
ALTER TABLE "user" ALTER COLUMN "sms_marketing_state" SET DEFAULT 'not_subscribed';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "role_new" AS ENUM ('admin', 'staff', 'user');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "role_new" USING ("role"::text::"role_new");
ALTER TYPE "role" RENAME TO "role_old";
ALTER TYPE "role_new" RENAME TO "role";
DROP TYPE "role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- DropForeignKey
ALTER TABLE "_DiscountToProduct" DROP CONSTRAINT "_DiscountToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiscountToProduct" DROP CONSTRAINT "_DiscountToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_color_id_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_product_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_address_id_fkey";

-- DropForeignKey
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_order_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_color_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_size_id_fkey";

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_product_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_user_id_fkey";

-- DropIndex
DROP INDEX "user_phone_key";

-- AlterTable
ALTER TABLE "_DiscountToProduct" DROP CONSTRAINT "_DiscountToProduct_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_DiscountToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "account_id_seq";

-- AlterTable
ALTER TABLE "address" DROP CONSTRAINT "address_pkey",
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "country_code" TEXT DEFAULT 'EG',
ADD COLUMN     "is_coordinates_validated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "zip" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "country" SET DATA TYPE TEXT,
ALTER COLUMN "state" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "street" SET DATA TYPE TEXT,
ALTER COLUMN "building" SET DATA TYPE TEXT,
ALTER COLUMN "address" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "address_id_seq";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ALTER COLUMN "stock_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("user_id", "stock_id");

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "category_id_seq";

-- AlterTable
ALTER TABLE "color" DROP CONSTRAINT "color_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "color_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "color_id_seq";

-- AlterTable
ALTER TABLE "discount" DROP CONSTRAINT "discount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ADD CONSTRAINT "discount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "discount_id_seq";

-- AlterTable
ALTER TABLE "image" DROP CONSTRAINT "image_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "color_id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "image_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "image_id_seq";

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
ADD COLUMN     "number" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_id_seq";

-- AlterTable
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_pkey",
DROP COLUMN "unit_price",
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "order_id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ALTER COLUMN "stock_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_item_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_item_id_seq";

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "category_id" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "product_id_seq";

-- AlterTable
ALTER TABLE "review" DROP CONSTRAINT "review_pkey",
ADD COLUMN     "media" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ALTER COLUMN "comment" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "review_id_seq";

-- AlterTable
ALTER TABLE "session" DROP CONSTRAINT "session_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "session_id_seq";

-- AlterTable
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "order_id" SET DATA TYPE TEXT,
ALTER COLUMN "address_id" SET DATA TYPE TEXT,
ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,2),
ADD CONSTRAINT "shipping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "shipping_id_seq";

-- AlterTable
ALTER TABLE "size" DROP CONSTRAINT "size_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "size_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "size_id_seq";

-- AlterTable
ALTER TABLE "stock" DROP CONSTRAINT "stock_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ALTER COLUMN "color_id" SET DATA TYPE TEXT,
ALTER COLUMN "size_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "stock_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "stock_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "is_email_verified",
DROP COLUMN "is_phone_verified",
DROP COLUMN "lang",
DROP COLUMN "phone",
ADD COLUMN     "email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "locale" TEXT DEFAULT 'en_US',
ADD COLUMN     "note" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "phone_number_verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email_marketing_state" SET DEFAULT 'not_subscribed',
ALTER COLUMN "sms_marketing_state" SET DEFAULT 'not_subscribed',
ALTER COLUMN "role" SET DEFAULT 'user',
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AlterTable
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_pkey",
ALTER COLUMN "address_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_id", "address_id");

-- AlterTable
ALTER TABLE "verification" DROP CONSTRAINT "verification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "verification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "verification_id_seq";

-- AlterTable
ALTER TABLE "wishlist" ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "order_number_key" ON "order"("number");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToProduct" ADD CONSTRAINT "_DiscountToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToProduct" ADD CONSTRAINT "_DiscountToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterSerial
ALTER SEQUENCE "order_number_seq" RESTART WITH 1000;
