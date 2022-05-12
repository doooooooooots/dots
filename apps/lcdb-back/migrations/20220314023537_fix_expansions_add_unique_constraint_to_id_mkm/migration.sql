/*
  Warnings:

  - A unique constraint covering the columns `[idMkm]` on the table `Expansion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Expansion_idMkm_key" ON "Expansion"("idMkm");
