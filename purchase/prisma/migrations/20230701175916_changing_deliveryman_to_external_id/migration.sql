/*
  Warnings:

  - You are about to drop the `deliveryman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_order` DROP FOREIGN KEY `tbl_order_deliveryman_id_fkey`;

-- DropTable
DROP TABLE `deliveryman`;
