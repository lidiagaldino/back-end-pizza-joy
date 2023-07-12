/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `tbl_ride` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `external_id` to the `tbl_ride` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_queue` DROP FOREIGN KEY `tbl_queue_ride_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_ride` ADD COLUMN `external_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tbl_ride_external_id_key` ON `tbl_ride`(`external_id`);

-- AddForeignKey
ALTER TABLE `tbl_queue` ADD CONSTRAINT `tbl_queue_ride_id_fkey` FOREIGN KEY (`ride_id`) REFERENCES `tbl_ride`(`external_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
