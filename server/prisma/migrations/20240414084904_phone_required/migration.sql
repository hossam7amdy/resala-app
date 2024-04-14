/*
  Warnings:

  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phone` CHAR(11) NOT NULL;
