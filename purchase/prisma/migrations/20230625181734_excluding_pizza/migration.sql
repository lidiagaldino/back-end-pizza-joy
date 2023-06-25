/*
  Warnings:

  - You are about to drop the `tbl_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_product_size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_size` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `tbl_produdct_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_product_size` DROP FOREIGN KEY `tbl_product_size_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_product_size` DROP FOREIGN KEY `tbl_product_size_size_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_produdct_order` DROP FOREIGN KEY `tbl_produdct_order_product_size_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_produdct_order` ADD COLUMN `product_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tbl_product`;

-- DropTable
DROP TABLE `tbl_product_size`;

-- DropTable
DROP TABLE `tbl_size`;
