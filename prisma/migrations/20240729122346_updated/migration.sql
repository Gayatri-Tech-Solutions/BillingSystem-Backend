/*
  Warnings:

  - You are about to drop the column `awd` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `box` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `deliverydist` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `item` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `awd`,
    DROP COLUMN `box`,
    DROP COLUMN `deliverydist`,
    DROP COLUMN `mode`,
    DROP COLUMN `rate`,
    DROP COLUMN `weight`,
    ADD COLUMN `item` JSON NOT NULL,
    ADD COLUMN `status` ENUM('Pending', 'Cleared', 'Cancelled') NOT NULL;
