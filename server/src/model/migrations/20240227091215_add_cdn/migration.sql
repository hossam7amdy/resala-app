/*
  Warnings:

  - You are about to drop the column `filename` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductAttachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_filename_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttachment" DROP CONSTRAINT "ProductAttachment_filename_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttachment" DROP CONSTRAINT "ProductAttachment_productId_fkey";

-- DropIndex
DROP INDEX "Category_filename_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "filename";

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "ProductAttachment";

-- CreateTable
CREATE TABLE "ProductImgage" (
    "id" SERIAL NOT NULL,
    "productId" CHAR(36) NOT NULL,
    "imageUrl" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImgage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImgage" ADD CONSTRAINT "ProductImgage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
