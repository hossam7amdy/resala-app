-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'MODERATOR', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('PENDING', 'FULFILLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('UNPAID', 'PAID', 'FAILED', 'VOIDED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "payment_method" AS ENUM ('CASH', 'CARD');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(125) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone" CHAR(11) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "role" "role" NOT NULL DEFAULT 'CUSTOMER',
    "password" VARCHAR(500) NOT NULL,
    "salt" VARCHAR(500) NOT NULL,
    "iterations" INTEGER NOT NULL,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_address" (
    "user_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_id","address_id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "ar_name" VARCHAR(100) NOT NULL,
    "en_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "ar_name" VARCHAR(50) NOT NULL,
    "en_name" VARCHAR(50) NOT NULL,
    "ar_description" VARCHAR(1000) NOT NULL,
    "en_description" VARCHAR(1000) NOT NULL,
    "price" DECIMAL(9,2) NOT NULL,
    "image_key" VARCHAR(50) NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_image" (
    "id" SERIAL NOT NULL,
    "color_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image_key" VARCHAR(50) NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id","product_id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "code" CHAR(7) NOT NULL,
    "ar_name" VARCHAR(15) NOT NULL,
    "en_name" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "user_id" INTEGER NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("user_id","stock_id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "subtotal" DECIMAL(9,2) NOT NULL,
    "discount" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(9,2) NOT NULL,
    "order_status" "order_status" NOT NULL DEFAULT 'PENDING',
    "payment_method" "payment_method" NOT NULL,
    "payment_status" "payment_status" NOT NULL DEFAULT 'UNPAID',
    "note" VARCHAR(250),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(15) NOT NULL,
    "size" VARCHAR(5) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(9,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "cost" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "transaction_order_id" INTEGER NOT NULL,
    "pending" BOOLEAN NOT NULL,
    "success" BOOLEAN NOT NULL,
    "is_auth" BOOLEAN NOT NULL,
    "is_capture" BOOLEAN NOT NULL,
    "amount_cents" DECIMAL(9,2) NOT NULL,
    "is_voided" BOOLEAN NOT NULL,
    "is_refunded" BOOLEAN NOT NULL,
    "is_3d_secure" BOOLEAN NOT NULL,
    "integration_id" INTEGER NOT NULL,
    "delivery_needed" BOOLEAN NOT NULL,
    "currency" CHAR(3) NOT NULL DEFAULT 'EGP',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "product_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" VARCHAR(250),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "content" VARCHAR(250) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "country" VARCHAR(50) NOT NULL DEFAULT 'Egypt',
    "state" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "building" VARCHAR(50),
    "floor" SMALLINT,
    "address" VARCHAR(250),
    "phone" CHAR(11) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AlterSequence
ALTER SEQUENCE user_id_seq RESTART WITH 200;

-- AlterSequence
ALTER SEQUENCE category_id_seq RESTART WITH 300;

-- AlterSequence
ALTER SEQUENCE product_id_seq RESTART WITH 400;

-- AlterSequence
ALTER SEQUENCE product_image_id_seq RESTART WITH 500;

-- AlterSequence
ALTER SEQUENCE stock_id_seq RESTART WITH 600;

-- AlterSequence
ALTER SEQUENCE color_id_seq RESTART WITH 700;

-- AlterSequence
ALTER SEQUENCE size_id_seq RESTART WITH 800;

-- AlterSequence
ALTER SEQUENCE order_id_seq RESTART WITH 1000;

-- AlterSequence
ALTER SEQUENCE order_item_id_seq RESTART WITH 1100;

-- AlterSequence
ALTER SEQUENCE shipping_id_seq RESTART WITH 1200;

-- AlterSequence
ALTER SEQUENCE payment_id_seq RESTART WITH 1300;

-- AlterSequence
ALTER SEQUENCE review_id_seq RESTART WITH 1400;

-- AlterSequence
ALTER SEQUENCE notification_id_seq RESTART WITH 1500;

-- AlterSequence
ALTER SEQUENCE address_id_seq RESTART WITH 1600;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_address_address_id_key" ON "user_address"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_ar_name_key" ON "category"("ar_name");

-- CreateIndex
CREATE UNIQUE INDEX "category_en_name_key" ON "category"("en_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_ar_name_key" ON "product"("ar_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_en_name_key" ON "product"("en_name");

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_id_color_id_size_id_key" ON "stock"("product_id", "color_id", "size_id");

-- CreateIndex
CREATE UNIQUE INDEX "color_code_key" ON "color"("code");

-- CreateIndex
CREATE UNIQUE INDEX "color_ar_name_key" ON "color"("ar_name");

-- CreateIndex
CREATE UNIQUE INDEX "color_en_name_key" ON "color"("en_name");

-- CreateIndex
CREATE UNIQUE INDEX "size_name_key" ON "size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_product_id_key" ON "wishlist"("user_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "shipping_order_id_key" ON "shipping"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "shipping_address_id_key" ON "shipping"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_order_id_key" ON "payment"("order_id");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
