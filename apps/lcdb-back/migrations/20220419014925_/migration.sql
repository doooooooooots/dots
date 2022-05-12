/*
  Warnings:

  - You are about to drop the column `quantityVariation` on the `StockUnit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StockUnit" DROP COLUMN "quantityVariation",
ADD COLUMN     "quantityVariations" JSONB DEFAULT E'[]';
