/*
  Warnings:

  - You are about to drop the column `lastEdited` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `targetArticleItem` on the `ControlAction` table. All the data in the column will be lost.
  - You are about to drop the column `articleItem` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `operator` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the `ArticleItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Action_targetArticleItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Action_targetStorage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleItem" DROP CONSTRAINT "ArticleItem_article_fkey";

-- DropForeignKey
ALTER TABLE "ArticleItem" DROP CONSTRAINT "ArticleItem_storage_fkey";

-- DropForeignKey
ALTER TABLE "ControlAction" DROP CONSTRAINT "ControlAction_targetArticleItem_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_articleItem_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_operator_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_author_fkey";

-- DropForeignKey
ALTER TABLE "_Action_targetArticleItem" DROP CONSTRAINT "_Action_targetArticleItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_Action_targetArticleItem" DROP CONSTRAINT "_Action_targetArticleItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_Action_targetStorage" DROP CONSTRAINT "_Action_targetStorage_A_fkey";

-- DropForeignKey
ALTER TABLE "_Action_targetStorage" DROP CONSTRAINT "_Action_targetStorage_B_fkey";

-- DropIndex
DROP INDEX "ControlAction_targetArticleItem_idx";

-- DropIndex
DROP INDEX "Offer_articleItem_idx";

-- DropIndex
DROP INDEX "Offer_operator_idx";

-- DropIndex
DROP INDEX "Price_author_idx";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "lastEdited",
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ControlAction" DROP COLUMN "targetArticleItem";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "articleItem",
DROP COLUMN "operator",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "stockUnit" TEXT;

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "author",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT;

-- DropTable
DROP TABLE "ArticleItem";

-- DropTable
DROP TABLE "_Action_targetArticleItem";

-- DropTable
DROP TABLE "_Action_targetStorage";

-- CreateTable
CREATE TABLE "StockUnit" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL DEFAULT E'',
    "article" TEXT,
    "storage" TEXT,

    CONSTRAINT "StockUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quantity" (
    "id" TEXT NOT NULL,
    "value" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "Quantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StockUnit_quantity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "StockUnit_pid_idx" ON "StockUnit"("pid");

-- CreateIndex
CREATE INDEX "StockUnit_article_idx" ON "StockUnit"("article");

-- CreateIndex
CREATE INDEX "StockUnit_storage_idx" ON "StockUnit"("storage");

-- CreateIndex
CREATE INDEX "Quantity_createdBy_idx" ON "Quantity"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "_StockUnit_quantity_AB_unique" ON "_StockUnit_quantity"("A", "B");

-- CreateIndex
CREATE INDEX "_StockUnit_quantity_B_index" ON "_StockUnit_quantity"("B");

-- CreateIndex
CREATE INDEX "Article_updatedBy_idx" ON "Article"("updatedBy");

-- CreateIndex
CREATE INDEX "Offer_stockUnit_idx" ON "Offer"("stockUnit");

-- CreateIndex
CREATE INDEX "Offer_createdBy_idx" ON "Offer"("createdBy");

-- CreateIndex
CREATE INDEX "Price_createdBy_idx" ON "Price"("createdBy");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_stockUnit_fkey" FOREIGN KEY ("stockUnit") REFERENCES "StockUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockUnit" ADD CONSTRAINT "StockUnit_article_fkey" FOREIGN KEY ("article") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockUnit" ADD CONSTRAINT "StockUnit_storage_fkey" FOREIGN KEY ("storage") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quantity" ADD CONSTRAINT "Quantity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockUnit_quantity" ADD FOREIGN KEY ("A") REFERENCES "Quantity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockUnit_quantity" ADD FOREIGN KEY ("B") REFERENCES "StockUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
