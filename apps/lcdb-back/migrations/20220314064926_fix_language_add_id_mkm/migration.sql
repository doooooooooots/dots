/*
  Warnings:

  - A unique constraint covering the columns `[idMkm]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Language_idMkm_key" ON "Language"("idMkm");
