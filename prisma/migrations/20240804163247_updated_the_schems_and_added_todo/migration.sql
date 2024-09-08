/*
  Warnings:

  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Customers` ADD COLUMN `otherData` JSON NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `customerData` JSON NULL,
    MODIFY `status` ENUM('Pending', 'Cleared', 'Cancelled', 'Done', 'todo') NOT NULL;

-- AlterTable
ALTER TABLE `Ledger` ADD COLUMN `otherData` JSON NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `otherData` JSON NULL;

-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Cleared', 'Cancelled', 'Done', 'todo') NOT NULL,
    `task` VARCHAR(191) NOT NULL,
    `otherData` JSON NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Todo_id_key`(`id`),
    UNIQUE INDEX `Todo_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ledger` ADD CONSTRAINT `Ledger_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
