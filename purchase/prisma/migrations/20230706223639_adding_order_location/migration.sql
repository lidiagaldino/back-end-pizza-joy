/*
  Warnings:

  - Added the required column `location_id` to the `tbl_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `tbl_order_deliveryman_id_fkey` ON `tbl_order`;

-- AlterTable
ALTER TABLE `tbl_order` ADD COLUMN `location_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_order` ADD CONSTRAINT `tbl_order_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
