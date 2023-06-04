/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tbl_usuario_adm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_usuario_adm_email_key` ON `tbl_usuario_adm`(`email`);
