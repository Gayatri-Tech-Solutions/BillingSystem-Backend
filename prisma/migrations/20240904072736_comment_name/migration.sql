/*
  Warnings:

  - A unique constraint covering the columns `[userId,gst]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,billNo]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customers_userId_gst_key` ON `Customers`(`userId`, `gst`);

-- CreateIndex
CREATE UNIQUE INDEX `Invoice_userId_billNo_key` ON `Invoice`(`userId`, `billNo`);
