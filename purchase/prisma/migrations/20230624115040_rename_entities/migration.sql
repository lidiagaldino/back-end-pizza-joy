/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentmethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productsize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_payment_method_id_fkey`;

-- DropForeignKey
ALTER TABLE `productorder` DROP FOREIGN KEY `ProductOrder_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `productorder` DROP FOREIGN KEY `ProductOrder_product_size_id_fkey`;

-- DropForeignKey
ALTER TABLE `productsize` DROP FOREIGN KEY `ProductSize_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `productsize` DROP FOREIGN KEY `ProductSize_size_id_fkey`;

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `payment`;

-- DropTable
DROP TABLE `paymentmethod`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `productorder`;

-- DropTable
DROP TABLE `productsize`;

-- DropTable
DROP TABLE `size`;

-- CreateTable
CREATE TABLE `tbl_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_product_external_id_key`(`external_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_product_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `size_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_size_external_id_key`(`external_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_produdct_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `product_size_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `finished_at` DATETIME(3) NULL,
    `intent_payment_id` VARCHAR(191) NOT NULL,
    `client_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_order_intent_payment_id_key`(`intent_payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_client_external_id_key`(`external_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_payment_method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `payment_method_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_payment_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_product_size` ADD CONSTRAINT `tbl_product_size_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `tbl_size`(`external_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_product_size` ADD CONSTRAINT `tbl_product_size_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`external_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_produdct_order` ADD CONSTRAINT `tbl_produdct_order_product_size_id_fkey` FOREIGN KEY (`product_size_id`) REFERENCES `tbl_product_size`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_produdct_order` ADD CONSTRAINT `tbl_produdct_order_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `tbl_order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_order` ADD CONSTRAINT `tbl_order_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_client`(`external_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_payment` ADD CONSTRAINT `tbl_payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `tbl_order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_payment` ADD CONSTRAINT `tbl_payment_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `tbl_payment_method`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
