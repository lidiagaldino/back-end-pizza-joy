/*
  Warnings:

  - You are about to drop the column `user_id` on the `tbl_ride` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `tbl_ride` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_ride` DROP COLUMN `user_id`,
    ADD COLUMN `client_id` INTEGER NOT NULL;
