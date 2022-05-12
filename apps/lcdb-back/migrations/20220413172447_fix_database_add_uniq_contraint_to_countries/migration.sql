/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "code" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");
