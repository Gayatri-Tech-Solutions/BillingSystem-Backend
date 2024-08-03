/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Address` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Customers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Ledger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` VARCHAR(191) NOT NULL,
    `prevAmount` INTEGER NOT NULL,
    `type` ENUM('Credit', 'Debit') NOT NULL,
    `newAmount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ledger_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Address_uuid_key` ON `Address`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Customers_uuid_key` ON `Customers`(`uuid`);

-- AddForeignKey
ALTER TABLE `Ledger` ADD CONSTRAINT `Ledger_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
