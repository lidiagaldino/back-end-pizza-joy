/*
  Warnings:

  - Added the required column `photo` to the `tbl_pizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_pizza` ADD COLUMN `photo` VARCHAR(191) NOT NULL;
