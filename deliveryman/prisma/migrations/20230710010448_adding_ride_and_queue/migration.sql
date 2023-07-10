-- CreateTable
CREATE TABLE `Queue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveryman_id` INTEGER NOT NULL,
    `ride_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ride` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,
    `finished_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveryman_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `tbl_deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_ride_id_fkey` FOREIGN KEY (`ride_id`) REFERENCES `Ride`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `tbl_deliveryman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
