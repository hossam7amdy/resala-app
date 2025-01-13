-- DropEnum
DROP TYPE "media_content_type";

-- CreateTable
CREATE TABLE "homepage_section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "link" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homepage_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slideshow_item" (
    "id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "link" TEXT,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slideshow_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_translation" (
    "section_id" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "section_translation_pkey" PRIMARY KEY ("section_id","language_code")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "order" INTEGER NOT NULL,
    "link" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_translation" (
    "menu_item_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "menu_item_translation_pkey" PRIMARY KEY ("menu_item_id","language_code")
);

-- AddForeignKey
ALTER TABLE "slideshow_item" ADD CONSTRAINT "slideshow_item_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "homepage_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_translation" ADD CONSTRAINT "HomepageSectionTranslation" FOREIGN KEY ("section_id") REFERENCES "homepage_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_translation" ADD CONSTRAINT "SlideshowItemTranslation" FOREIGN KEY ("section_id") REFERENCES "slideshow_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_translation" ADD CONSTRAINT "menu_item_translation_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
