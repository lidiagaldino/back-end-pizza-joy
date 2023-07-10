/*
  Warnings:

  - Added the required column `distance` to the `tbl_queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_queue` ADD COLUMN `distance` INTEGER NOT NULL;
