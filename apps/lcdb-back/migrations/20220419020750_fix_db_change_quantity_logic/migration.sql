/*
  Warnings:

  - You are about to drop the column `quantityVariations` on the `StockUnit` table. All the data in the column will be lost.
  - You are about to drop the `Quantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quantity" DROP CONSTRAINT "Quantity_createdBy_fkey";

-- AlterTable
ALTER TABLE "StockUnit" DROP COLUMN "quantityVariations",
ALTER COLUMN "quantity" DROP DEFAULT;

-- DropTable
DROP TABLE "Quantity";

-- CreateTable
CREATE TABLE "StockUnitQuantity" (
    "id" TEXT NOT NULL,
    "value" INTEGER,
    "stockUnit" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "StockUnitQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StockUnitQuantity_stockUnit_idx" ON "StockUnitQuantity"("stockUnit");

-- CreateIndex
CREATE INDEX "StockUnitQuantity_createdBy_idx" ON "StockUnitQuantity"("createdBy");

-- AddForeignKey
ALTER TABLE "StockUnitQuantity" ADD CONSTRAINT "StockUnitQuantity_stockUnit_fkey" FOREIGN KEY ("stockUnit") REFERENCES "StockUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockUnitQuantity" ADD CONSTRAINT "StockUnitQuantity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
