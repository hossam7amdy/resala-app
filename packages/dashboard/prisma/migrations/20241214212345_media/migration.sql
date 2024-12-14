-- CreateEnum
CREATE TYPE "media_content_type" AS ENUM ('image', 'video');

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "content_type" "media_content_type" NOT NULL DEFAULT 'image',
    "duration" INTEGER,
    "alt" TEXT,
    "mimetype" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);
