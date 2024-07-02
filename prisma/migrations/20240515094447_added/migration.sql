-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gst` VARCHAR(191) NOT NULL,
    `awd` VARCHAR(191) NOT NULL,
    `deliverydist` VARCHAR(191) NOT NULL,
    `box` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,
    `rate` INTEGER NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `Invoice_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
