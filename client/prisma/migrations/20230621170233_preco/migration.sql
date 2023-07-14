/*
  Warnings:

  - You are about to drop the column `preco` on the `tbl_pizza` table. All the data in the column will be lost.
  - Added the required column `preco` to the `tbl_pizza_tamanho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_pizza` DROP COLUMN `preco`;

-- AlterTable
ALTER TABLE `tbl_pizza_tamanho` ADD COLUMN `preco` DOUBLE NOT NULL;
