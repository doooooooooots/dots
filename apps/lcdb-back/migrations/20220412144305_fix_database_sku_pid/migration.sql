/*
  Warnings:

  - You are about to drop the column `sku` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `ArticleItem` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageToken` on the `ProductLocal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_sku_key";

-- DropIndex
DROP INDEX "ArticleItem_sku_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "sku",
ADD COLUMN     "pid" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "ArticleItem" DROP COLUMN "sku",
ADD COLUMN     "pid" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "targetField" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "sku",
ADD COLUMN     "pid" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sku",
ADD COLUMN     "pid" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "ProductLocal" DROP COLUMN "imageToken",
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE INDEX "Article_pid_idx" ON "Article"("pid");

-- CreateIndex
CREATE INDEX "ArticleItem_pid_idx" ON "ArticleItem"("pid");

-- CreateIndex
CREATE INDEX "ProductLocal_image_idx" ON "ProductLocal"("image");

-- AddForeignKey
ALTER TABLE "ProductLocal" ADD CONSTRAINT "ProductLocal_image_fkey" FOREIGN KEY ("image") REFERENCES "MediaObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
