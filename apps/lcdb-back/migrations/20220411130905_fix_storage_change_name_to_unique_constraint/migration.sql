/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Rarity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Storage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Rarity_value_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_value_key" ON "Rarity"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Storage_name_key" ON "Storage"("name");
