/*
  Warnings:

  - Added the required column `total` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ledger` ADD COLUMN `total` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
