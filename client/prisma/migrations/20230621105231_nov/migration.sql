/*
  Warnings:

  - A unique constraint covering the columns `[nome_ingrediente]` on the table `tbl_ingrediente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome_tamanho]` on the table `tbl_tamanho` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_ingrediente_nome_ingrediente_key` ON `tbl_ingrediente`(`nome_ingrediente`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_tamanho_nome_tamanho_key` ON `tbl_tamanho`(`nome_tamanho`);
