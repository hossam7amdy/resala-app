/*
  Warnings:

  - You are about to drop the column `color` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `user_id` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `product_id` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_order_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "transaction_id" VARCHAR(32),
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "color",
DROP COLUMN "image_url",
DROP COLUMN "name",
DROP COLUMN "size",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "stock_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "user_id" SET NOT NULL;

-- DropTable
DROP TABLE "payment";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
