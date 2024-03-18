-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `stock_product_id_fkey`;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
