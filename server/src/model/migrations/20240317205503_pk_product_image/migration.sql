/*
  Warnings:

  - The primary key for the `product_image` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `product_image` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `product_id`);
