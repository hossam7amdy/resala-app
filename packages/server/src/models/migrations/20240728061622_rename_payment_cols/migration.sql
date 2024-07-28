/*
  Warnings:

  - You are about to drop the column `order_ref` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_url` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_ref` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "order_ref",
DROP COLUMN "payment_url",
DROP COLUMN "transaction_ref",
ADD COLUMN     "payment_link" VARCHAR(500),
ADD COLUMN     "transaction_id" INTEGER,
ADD COLUMN     "transaction_order_id" INTEGER;
