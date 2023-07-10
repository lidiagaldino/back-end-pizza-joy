/*
  Warnings:

  - You are about to drop the `queue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ride` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `queue` DROP FOREIGN KEY `Queue_deliveryman_id_fkey`;

-- DropForeignKey
ALTER TABLE `queue` DROP FOREIGN KEY `Queue_ride_id_fkey`;

-- DropForeignKey
ALTER TABLE `ride` DROP FOREIGN KEY `Ride_deliveryman_id_fkey`;

-- DropTable
DROP TABLE `queue`;

-- DropTable
DROP TABLE `ride`;

-- CreateTable
CREATE TABLE `tbl_queue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveryman_id` INTEGER NOT NULL,
    `ride_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ride` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,
    `finished_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveryman_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_queue` ADD CONSTRAINT `tbl_queue_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `tbl_deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_queue` ADD CONSTRAINT `tbl_queue_ride_id_fkey` FOREIGN KEY (`ride_id`) REFERENCES `tbl_ride`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_ride` ADD CONSTRAINT `tbl_ride_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `tbl_deliveryman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
