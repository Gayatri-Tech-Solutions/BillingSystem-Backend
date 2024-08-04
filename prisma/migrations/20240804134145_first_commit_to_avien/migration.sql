-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gst` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customers_id_key`(`id`),
    UNIQUE INDEX `Customers_uuid_key`(`uuid`),
    UNIQUE INDEX `Customers_gst_key`(`gst`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `houseno` VARCHAR(191) NULL,
    `locality` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `pin` INTEGER NULL,
    `country` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Address_id_key`(`id`),
    UNIQUE INDEX `Address_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gst` VARCHAR(191) NOT NULL,
    `item` JSON NOT NULL,
    `customerData` JSON NOT NULL,
    `customerId` INTEGER NOT NULL,
    `billNo` VARCHAR(191) NOT NULL,
    `status` ENUM('Pending', 'Cleared', 'Cancelled') NOT NULL,
    `amount` INTEGER NOT NULL,
    `tax` INTEGER NOT NULL,
    `totalAmount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Invoice_id_key`(`id`),
    UNIQUE INDEX `Invoice_billNo_key`(`billNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ledger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` VARCHAR(191) NOT NULL,
    `prevAmount` INTEGER NOT NULL,
    `type` ENUM('Credit', 'Debit', 'Cancelled') NOT NULL,
    `newAmount` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ledger_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ledger` ADD CONSTRAINT `Ledger_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
