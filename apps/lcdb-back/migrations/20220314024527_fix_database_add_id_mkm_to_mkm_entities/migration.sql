/*
  Warnings:

  - You are about to drop the `Medium` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idMkm]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMkm]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMkm]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMkm]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMkm]` on the table `ProductModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMkm]` on the table `Rarity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_image_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "ProductModel" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Rarity" ADD COLUMN     "idMkm" TEXT NOT NULL DEFAULT E'';

-- DropTable
DROP TABLE "Medium";

-- CreateTable
CREATE TABLE "MediaObject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "url" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "MediaObject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_idMkm_key" ON "Category"("idMkm");

-- CreateIndex
CREATE UNIQUE INDEX "Game_idMkm_key" ON "Game"("idMkm");

-- CreateIndex
CREATE UNIQUE INDEX "Language_idMkm_key" ON "Language"("idMkm");

-- CreateIndex
CREATE UNIQUE INDEX "Product_idMkm_key" ON "Product"("idMkm");

-- CreateIndex
CREATE UNIQUE INDEX "ProductModel_idMkm_key" ON "ProductModel"("idMkm");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_idMkm_key" ON "Rarity"("idMkm");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_image_fkey" FOREIGN KEY ("image") REFERENCES "MediaObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
