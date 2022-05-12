/*
  Warnings:

  - You are about to drop the `_Offer_price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Offer_price" DROP CONSTRAINT "_Offer_price_A_fkey";

-- DropForeignKey
ALTER TABLE "_Offer_price" DROP CONSTRAINT "_Offer_price_B_fkey";

-- DropTable
DROP TABLE "_Offer_price";

-- CreateTable
CREATE TABLE "PriceOffer" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "currency" TEXT,
    "offer" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "PriceOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceOffer_currency_idx" ON "PriceOffer"("currency");

-- CreateIndex
CREATE INDEX "PriceOffer_offer_idx" ON "PriceOffer"("offer");

-- CreateIndex
CREATE INDEX "PriceOffer_createdBy_idx" ON "PriceOffer"("createdBy");

-- AddForeignKey
ALTER TABLE "PriceOffer" ADD CONSTRAINT "PriceOffer_currency_fkey" FOREIGN KEY ("currency") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceOffer" ADD CONSTRAINT "PriceOffer_offer_fkey" FOREIGN KEY ("offer") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceOffer" ADD CONSTRAINT "PriceOffer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
