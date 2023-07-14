/*
  Warnings:

  - Made the column `senha` on table `tbl_usuario_adm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tbl_usuario_adm` MODIFY `senha` VARCHAR(191) NOT NULL;
