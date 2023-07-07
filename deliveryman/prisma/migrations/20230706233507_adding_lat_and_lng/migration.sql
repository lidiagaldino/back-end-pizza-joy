/*
  Warnings:

  - Added the required column `lat` to the `tbl_deliveryman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `tbl_deliveryman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_deliveryman` ADD COLUMN `lat` DOUBLE NOT NULL,
    ADD COLUMN `lng` DOUBLE NOT NULL;
