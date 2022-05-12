/*
  Warnings:

  - You are about to drop the column `locals` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_locals_fkey";

-- DropIndex
DROP INDEX "Product_locals_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "locals";

-- CreateTable
CREATE TABLE "_Product_locals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Product_locals_AB_unique" ON "_Product_locals"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_locals_B_index" ON "_Product_locals"("B");

-- AddForeignKey
ALTER TABLE "_Product_locals" ADD FOREIGN KEY ("A") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_locals" ADD FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
