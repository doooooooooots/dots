/*
  Warnings:

  - A unique constraint covering the columns `[pid]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pid]` on the table `StockUnit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Article_pid_idx";

-- DropIndex
DROP INDEX "StockUnit_pid_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Article_pid_key" ON "Article"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "StockUnit_pid_key" ON "StockUnit"("pid");
