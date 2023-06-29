/*
  Warnings:

  - You are about to drop the column `on_way` on the `tbl_order` table. All the data in the column will be lost.
  - You are about to drop the column `ready_for_delivery` on the `tbl_order` table. All the data in the column will be lost.
  - Added the required column `order_status_id` to the `tbl_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_order` DROP COLUMN `on_way`,
    DROP COLUMN `ready_for_delivery`,
    ADD COLUMN `order_status_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `OrderStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_order` ADD CONSTRAINT `tbl_order_order_status_id_fkey` FOREIGN KEY (`order_status_id`) REFERENCES `OrderStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
