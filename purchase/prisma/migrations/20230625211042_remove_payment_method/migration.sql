/*
  Warnings:

  - You are about to drop the column `payment_method_id` on the `tbl_payment` table. All the data in the column will be lost.
  - You are about to drop the `tbl_payment_method` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_payment` DROP FOREIGN KEY `tbl_payment_payment_method_id_fkey`;

-- DropIndex
DROP INDEX `tbl_produdct_order_product_size_id_fkey` ON `tbl_produdct_order`;

-- AlterTable
ALTER TABLE `tbl_payment` DROP COLUMN `payment_method_id`;

-- DropTable
DROP TABLE `tbl_payment_method`;
