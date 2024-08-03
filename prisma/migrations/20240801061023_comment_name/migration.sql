/*
  Warnings:

  - Added the required column `customerData` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `customerData` JSON NOT NULL,
    ADD COLUMN `tax` INTEGER NOT NULL,
    ADD COLUMN `totalAmount` INTEGER NOT NULL;
