-- CreateTable
CREATE TABLE `tbl_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(25) NOT NULL,
    `street` VARCHAR(50) NOT NULL,
    `complement` VARCHAR(100) NOT NULL,
    `neighborhood` VARCHAR(50) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(10) NOT NULL,
    `number` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_client_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_Id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL,

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
ALTER TABLE `tbl_client_address` ADD CONSTRAINT `tbl_client_address_client_Id_fkey` FOREIGN KEY (`client_Id`) REFERENCES `tbl_client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_client_address` ADD CONSTRAINT `tbl_client_address_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `tbl_address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingredient` ADD CONSTRAINT `tbl_pizza_ingredient_id_pizza_fkey` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingredient` ADD CONSTRAINT `tbl_pizza_ingredient_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `tbl_ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_size` ADD CONSTRAINT `tbl_pizza_size_pizza_id_fkey` FOREIGN KEY (`pizza_id`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_size` ADD CONSTRAINT `tbl_pizza_size_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `tbl_size`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
