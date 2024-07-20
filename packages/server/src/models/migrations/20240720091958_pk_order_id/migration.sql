/*
  Warnings:

  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "payment_order_id_key";

-- AlterTable
ALTER TABLE "payment" DROP CONSTRAINT "payment_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("order_id");
