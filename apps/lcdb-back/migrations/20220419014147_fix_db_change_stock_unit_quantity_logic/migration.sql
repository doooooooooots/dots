/*
  Warnings:

  - You are about to drop the column `currentQuantity` on the `StockUnit` table. All the data in the column will be lost.
  - You are about to drop the `_StockUnit_quantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StockUnit_quantity" DROP CONSTRAINT "_StockUnit_quantity_A_fkey";

-- DropForeignKey
ALTER TABLE "_StockUnit_quantity" DROP CONSTRAINT "_StockUnit_quantity_B_fkey";

-- AlterTable
ALTER TABLE "StockUnit" DROP COLUMN "currentQuantity",
ADD COLUMN     "quantity" INTEGER DEFAULT 0,
ADD COLUMN     "quantityVariation" JSONB DEFAULT E'[]';

-- DropTable
DROP TABLE "_StockUnit_quantity";
