/*
  Warnings:

  - You are about to drop the column `pid` on the `StockUnit` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "StockUnit_pid_key";

-- AlterTable
ALTER TABLE "StockUnit" DROP COLUMN "pid";
