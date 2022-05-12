/*
  Warnings:

  - You are about to drop the column `locals` on the `Expansion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expansion" DROP CONSTRAINT "Expansion_locals_fkey";

-- DropIndex
DROP INDEX "Expansion_locals_idx";

-- AlterTable
ALTER TABLE "Expansion" DROP COLUMN "locals";

-- CreateTable
CREATE TABLE "_Expansion_locals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Expansion_locals_AB_unique" ON "_Expansion_locals"("A", "B");

-- CreateIndex
CREATE INDEX "_Expansion_locals_B_index" ON "_Expansion_locals"("B");

-- AddForeignKey
ALTER TABLE "_Expansion_locals" ADD FOREIGN KEY ("A") REFERENCES "Expansion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Expansion_locals" ADD FOREIGN KEY ("B") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE CASCADE;
