/*
  Warnings:

  - A unique constraint covering the columns `[senha]` on the table `tbl_usuario_adm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_usuario_adm_senha_key` ON `tbl_usuario_adm`(`senha`);
