/*
  Warnings:

  - You are about to drop the column `amount_cents` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_needed` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `integration_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `is_3d_secure` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `is_auth` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `is_capture` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `is_refunded` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `is_voided` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `pending` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `success` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_order_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "amount_cents",
DROP COLUMN "created_at",
DROP COLUMN "currency",
DROP COLUMN "delivery_needed",
DROP COLUMN "integration_id",
DROP COLUMN "is_3d_secure",
DROP COLUMN "is_auth",
DROP COLUMN "is_capture",
DROP COLUMN "is_refunded",
DROP COLUMN "is_voided",
DROP COLUMN "pending",
DROP COLUMN "success",
DROP COLUMN "transaction_id",
DROP COLUMN "transaction_order_id",
DROP COLUMN "updated_at",
ADD COLUMN     "order_ref" INTEGER,
ADD COLUMN     "payment_url" VARCHAR(500),
ADD COLUMN     "transaction_ref" INTEGER;
