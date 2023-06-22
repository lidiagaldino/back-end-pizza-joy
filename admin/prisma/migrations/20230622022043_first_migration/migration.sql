-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pizza` INTEGER NOT NULL,
    `ingredient_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `price` DOUBLE NOT NULL,

    UNIQUE INDEX `tbl_ingredient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pizza_id` INTEGER NOT NULL,
    `size_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tbl_size_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingredient` ADD CONSTRAINT `tbl_pizza_ingredient_id_pizza_fkey` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingredient` ADD CONSTRAINT `tbl_pizza_ingredient_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `tbl_ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_size` ADD CONSTRAINT `tbl_pizza_size_pizza_id_fkey` FOREIGN KEY (`pizza_id`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_size` ADD CONSTRAINT `tbl_pizza_size_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `tbl_size`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
