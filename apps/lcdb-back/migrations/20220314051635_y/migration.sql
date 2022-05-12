/*
  Warnings:

  - You are about to drop the column `value` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `Condition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[abbreviation]` on the table `Expansion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Condition_value_idx";

-- DropIndex
DROP INDEX "Language_value_idx";

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "value";

-- CreateIndex
CREATE UNIQUE INDEX "Condition_value_key" ON "Condition"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Expansion_abbreviation_key" ON "Expansion"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");
