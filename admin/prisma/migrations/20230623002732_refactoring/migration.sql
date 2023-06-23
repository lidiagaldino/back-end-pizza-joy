/*
  Warnings:

  - You are about to drop the `tbl_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza_size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_pizza_ingredient` DROP FOREIGN KEY `tbl_pizza_ingredient_id_pizza_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_ingredient` DROP FOREIGN KEY `tbl_pizza_ingredient_ingredient_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_size` DROP FOREIGN KEY `tbl_pizza_size_pizza_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_size` DROP FOREIGN KEY `tbl_pizza_size_size_id_fkey`;

-- DropTable
DROP TABLE `tbl_ingredient`;

-- DropTable
DROP TABLE `tbl_pizza`;

-- DropTable
DROP TABLE `tbl_pizza_ingredient`;

-- DropTable
DROP TABLE `tbl_pizza_size`;

-- DropTable
DROP TABLE `tbl_size`;
