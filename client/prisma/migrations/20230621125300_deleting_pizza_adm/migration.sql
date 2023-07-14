/*
  Warnings:

  - You are about to drop the `tbl_usuario_adm_pizza` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_usuario_adm_pizza` DROP FOREIGN KEY `tbl_usuario_adm_pizza_id_pizza_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_usuario_adm_pizza` DROP FOREIGN KEY `tbl_usuario_adm_pizza_id_usuario_adm_fkey`;

-- DropTable
DROP TABLE `tbl_usuario_adm_pizza`;
