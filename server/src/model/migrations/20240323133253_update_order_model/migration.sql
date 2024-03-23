/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `shipping` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `shipping` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_cents` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_needed` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `integration_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_3d_secure` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_auth` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_capture` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pending` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_order_id` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    ADD COLUMN `fulfilment_status` ENUM('PENDING', 'FULFILLED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `payment_method` ENUM('CASH', 'CARD') NOT NULL,
    ADD COLUMN `payment_status` ENUM('PENDING', 'PAID', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `shipping` DECIMAL(9, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `amount`,
    DROP COLUMN `method`,
    DROP COLUMN `note`,
    DROP COLUMN `status`,
    ADD COLUMN `amount_cents` DECIMAL(9, 2) NOT NULL,
    ADD COLUMN `currency` CHAR(3) NOT NULL DEFAULT 'EGP',
    ADD COLUMN `delivery_needed` BOOLEAN NOT NULL,
    ADD COLUMN `integration_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `is_3d_secure` BOOLEAN NOT NULL,
    ADD COLUMN `is_auth` BOOLEAN NOT NULL,
    ADD COLUMN `is_capture` BOOLEAN NOT NULL,
    ADD COLUMN `pending` BOOLEAN NOT NULL,
    ADD COLUMN `success` BOOLEAN NOT NULL,
    ADD COLUMN `transaction_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `transaction_order_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `shipping` DROP COLUMN `cost`,
    DROP COLUMN `note`;
