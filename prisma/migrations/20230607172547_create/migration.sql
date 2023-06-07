/*
  Warnings:

  - You are about to drop the column `tamanho` on the `tbl_pizza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tbl_pizza` DROP COLUMN `tamanho`;

-- CreateTable
CREATE TABLE `tbl_pizza_tamanho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pizza` INTEGER NOT NULL,
    `id_tamanho` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tamanho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_tamanho` VARCHAR(50) NOT NULL,
    `preco_tamanho` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_pizza_tamanho` ADD CONSTRAINT `tbl_pizza_tamanho_id_pizza_fkey` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_tamanho` ADD CONSTRAINT `tbl_pizza_tamanho_id_tamanho_fkey` FOREIGN KEY (`id_tamanho`) REFERENCES `tbl_tamanho`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
