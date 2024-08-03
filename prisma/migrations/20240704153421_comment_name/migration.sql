/*
  Warnings:

  - A unique constraint covering the columns `[gst]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customers_gst_key` ON `Customers`(`gst`);
