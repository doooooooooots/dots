/*
  Warnings:

  - You are about to drop the column `end_time` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `expected_end_time` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `expected_start_time` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `batchProd` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `priceCurrency` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `priceSuggested` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `priceCurrency` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `article` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `operator` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `action` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `ArticleItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_batchProd_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_priceCurrency_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_priceCurrency_fkey";

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_article_fkey";

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_operator_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_action_fkey";

-- DropIndex
DROP INDEX "Article_batchProd_idx";

-- DropIndex
DROP INDEX "Article_priceCurrency_idx";

-- DropIndex
DROP INDEX "Offer_priceCurrency_idx";

-- DropIndex
DROP INDEX "Pricing_article_idx";

-- DropIndex
DROP INDEX "Pricing_operator_idx";

-- DropIndex
DROP INDEX "Rating_action_idx";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "end_time",
DROP COLUMN "expected_end_time",
DROP COLUMN "expected_start_time",
DROP COLUMN "start_time",
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "expectedEndTime" TIMESTAMP(3),
ADD COLUMN     "expectedStartTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "batchProd",
DROP COLUMN "comment",
DROP COLUMN "from",
DROP COLUMN "priceCurrency",
DROP COLUMN "priceSuggested";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "price",
DROP COLUMN "priceCurrency";

-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "article",
DROP COLUMN "operator",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "action";

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "currency" TEXT,
    "author" TEXT,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "CountryGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Offer_price" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Article_priceSuggested" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BatchProd_articles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Pricing_prices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Pricing_countries" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Pricing_zones" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Action_ratings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryGroup_countries" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Price_currency_idx" ON "Price"("currency");

-- CreateIndex
CREATE INDEX "Price_author_idx" ON "Price"("author");

-- CreateIndex
CREATE UNIQUE INDEX "_Offer_price_AB_unique" ON "_Offer_price"("A", "B");

-- CreateIndex
CREATE INDEX "_Offer_price_B_index" ON "_Offer_price"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Article_priceSuggested_AB_unique" ON "_Article_priceSuggested"("A", "B");

-- CreateIndex
CREATE INDEX "_Article_priceSuggested_B_index" ON "_Article_priceSuggested"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BatchProd_articles_AB_unique" ON "_BatchProd_articles"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchProd_articles_B_index" ON "_BatchProd_articles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Pricing_prices_AB_unique" ON "_Pricing_prices"("A", "B");

-- CreateIndex
CREATE INDEX "_Pricing_prices_B_index" ON "_Pricing_prices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Pricing_countries_AB_unique" ON "_Pricing_countries"("A", "B");

-- CreateIndex
CREATE INDEX "_Pricing_countries_B_index" ON "_Pricing_countries"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Pricing_zones_AB_unique" ON "_Pricing_zones"("A", "B");

-- CreateIndex
CREATE INDEX "_Pricing_zones_B_index" ON "_Pricing_zones"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Action_ratings_AB_unique" ON "_Action_ratings"("A", "B");

-- CreateIndex
CREATE INDEX "_Action_ratings_B_index" ON "_Action_ratings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryGroup_countries_AB_unique" ON "_CountryGroup_countries"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryGroup_countries_B_index" ON "_CountryGroup_countries"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Article_sku_key" ON "Article"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleItem_sku_key" ON "ArticleItem"("sku");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_currency_fkey" FOREIGN KEY ("currency") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_author_fkey" FOREIGN KEY ("author") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Offer_price" ADD FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Offer_price" ADD FOREIGN KEY ("B") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_priceSuggested" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Article_priceSuggested" ADD FOREIGN KEY ("B") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchProd_articles" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchProd_articles" ADD FOREIGN KEY ("B") REFERENCES "BatchProd"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_prices" ADD FOREIGN KEY ("A") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_prices" ADD FOREIGN KEY ("B") REFERENCES "Pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_countries" ADD FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_countries" ADD FOREIGN KEY ("B") REFERENCES "Pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_zones" ADD FOREIGN KEY ("A") REFERENCES "CountryGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_zones" ADD FOREIGN KEY ("B") REFERENCES "Pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_ratings" ADD FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_ratings" ADD FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryGroup_countries" ADD FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryGroup_countries" ADD FOREIGN KEY ("B") REFERENCES "CountryGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
