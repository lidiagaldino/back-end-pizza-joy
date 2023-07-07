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
    `complement` VARCHAR(100) NULL,
    `neighborhood` VARCHAR(50) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(10) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_client_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_Id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_client_address` ADD CONSTRAINT `tbl_client_address_client_Id_fkey` FOREIGN KEY (`client_Id`) REFERENCES `tbl_client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_client_address` ADD CONSTRAINT `tbl_client_address_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `tbl_address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
