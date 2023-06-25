/*
  Warnings:

  - Added the required column `category_id` to the `tbl_pizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_pizza` ADD COLUMN `category_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Catergory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_pizza` ADD CONSTRAINT `tbl_pizza_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Catergory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
