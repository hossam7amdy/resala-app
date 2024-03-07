/*
  Warnings:

  - You are about to alter the column `state` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `city` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `street` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - You are about to alter the column `building` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - The `floor` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `note` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(200)`.
  - You are about to alter the column `title` on the `Notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(25)`.
  - You are about to alter the column `name` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `size` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(5)`.
  - You are about to alter the column `method` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `arName` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `enName` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Size` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(5)`.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserAddress` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "state" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "street" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "building" SET DATA TYPE VARCHAR(50),
DROP COLUMN "floor",
ADD COLUMN     "floor" SMALLINT,
ALTER COLUMN "note" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "title" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "size" SET DATA TYPE VARCHAR(5);

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "method" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "arName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "enName" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "name" SET DATA TYPE VARCHAR(5);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
