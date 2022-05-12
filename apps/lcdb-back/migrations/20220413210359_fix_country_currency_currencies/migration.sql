/*
  Warnings:

  - You are about to drop the column `currency` on the `Country` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_currency_fkey";

-- DropIndex
DROP INDEX "Country_currency_idx";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "currency";

-- CreateTable
CREATE TABLE "_Country_currencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Country_currencies_AB_unique" ON "_Country_currencies"("A", "B");

-- CreateIndex
CREATE INDEX "_Country_currencies_B_index" ON "_Country_currencies"("B");

-- AddForeignKey
ALTER TABLE "_Country_currencies" ADD FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Country_currencies" ADD FOREIGN KEY ("B") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
