/*
  Warnings:

  - You are about to drop the column `idMkm` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_idMkm_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "idMkm";
