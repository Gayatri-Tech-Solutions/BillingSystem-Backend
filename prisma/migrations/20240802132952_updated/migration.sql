-- AlterTable
ALTER TABLE `ledger` MODIFY `type` ENUM('Credit', 'Debit', 'Cancelled') NOT NULL;
