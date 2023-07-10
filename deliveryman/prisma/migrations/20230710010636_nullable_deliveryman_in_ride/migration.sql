-- DropForeignKey
ALTER TABLE `ride` DROP FOREIGN KEY `Ride_deliveryman_id_fkey`;

-- AlterTable
ALTER TABLE `ride` MODIFY `deliveryman_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ride` ADD CONSTRAINT `Ride_deliveryman_id_fkey` FOREIGN KEY (`deliveryman_id`) REFERENCES `tbl_deliveryman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
