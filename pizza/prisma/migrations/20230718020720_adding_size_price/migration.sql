/*
  Warnings:

  - Added the required column `price` to the `tbl_size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_size` ADD COLUMN `price` DOUBLE NOT NULL;
