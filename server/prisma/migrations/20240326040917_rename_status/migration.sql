/*
  Warnings:

  - You are about to drop the column `fulfilment_status` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `fulfilment_status`,
    ADD COLUMN `order_status` ENUM('PENDING', 'FULFILLED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
