-- CreateTable
CREATE TABLE `tbl_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(25) NOT NULL,
    `logradouro` VARCHAR(50) NOT NULL,
    `complemento` VARCHAR(100) NOT NULL,
    `bairro` VARCHAR(50) NOT NULL,
    `localidade` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cliente_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(3) NOT NULL,
    `status_pedido` VARCHAR(40) NOT NULL,
    `id_cliente` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `descricao` TEXT NOT NULL,
    `tamanho` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pedido_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade_pizzas` DOUBLE NOT NULL,
    `id_pedido` INTEGER NOT NULL,
    `id_pizza` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_ingrediente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pizza` INTEGER NOT NULL,
    `id_ingrediente` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingrediente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_ingrediente` VARCHAR(50) NOT NULL,
    `preco_ingrediente` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_cliente_endereco` ADD CONSTRAINT `tbl_cliente_endereco_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cliente_endereco` ADD CONSTRAINT `tbl_cliente_endereco_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido_pizza` ADD CONSTRAINT `tbl_pedido_pizza_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `tbl_pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido_pizza` ADD CONSTRAINT `tbl_pedido_pizza_id_pizza_fkey` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingrediente` ADD CONSTRAINT `tbl_pizza_ingrediente_id_pizza_fkey` FOREIGN KEY (`id_pizza`) REFERENCES `tbl_pizza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingrediente` ADD CONSTRAINT `tbl_pizza_ingrediente_id_ingrediente_fkey` FOREIGN KEY (`id_ingrediente`) REFERENCES `tbl_ingrediente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
