/*
  Warnings:

  - You are about to alter the column `phone` on the `Shipping` table. The data in that column could be lost. The data in that column will be cast from `Char(15)` to `Char(11)`.
  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Char(15)` to `Char(11)`.

*/
-- AlterTable
ALTER TABLE "Shipping" ALTER COLUMN "phone" SET DATA TYPE CHAR(11);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE CHAR(11);
