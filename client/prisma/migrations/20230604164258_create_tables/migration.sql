-- CreateTable
CREATE TABLE `tbl_usuario_adm_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario_adm` INTEGER NOT NULL,
    `id_pizza` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_usuario_adm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_usuario_adm_pizza` ADD CONSTRAINT `tbl_usuario_adm_pizza_id_usuario_adm_fkey` FOREIGN KEY (`id_usuario_adm`) REFERENCES `tbl_usuario_adm`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_usuario_adm_pizza` ADD CONSTRAINT `tbl_usuario_adm_pizza_id_pizza_fkey` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
