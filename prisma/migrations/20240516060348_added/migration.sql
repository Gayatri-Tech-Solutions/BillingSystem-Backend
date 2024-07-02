/*
  Warnings:

  - Added the required column `billNo` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `billNo` INTEGER NOT NULL;
