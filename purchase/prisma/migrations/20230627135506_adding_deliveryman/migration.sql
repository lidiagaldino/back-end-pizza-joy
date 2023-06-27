-- AlterTable
ALTER TABLE `tbl_order` ADD COLUMN `deliveryman_id` INTEGER NULL,
    ADD COLUMN `on_way` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ready_for_delivery` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `DeliveryMan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_order` ADD CONSTRAINT `tbl_order_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `DeliveryMan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
