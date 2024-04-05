/*
  Warnings:

  - Added the required column `is_refunded` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_voided` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `is_refunded` BOOLEAN NOT NULL,
    ADD COLUMN `is_voided` BOOLEAN NOT NULL;
