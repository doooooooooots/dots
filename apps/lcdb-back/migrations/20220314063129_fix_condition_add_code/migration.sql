/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Condition` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Condition" ADD COLUMN     "code" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Condition_code_key" ON "Condition"("code");
