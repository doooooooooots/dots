-- CreateTable
CREATE TABLE "ProductReconciliation" (
    "id" TEXT NOT NULL,
    "plateform" TEXT,
    "productId" TEXT,
    "localId" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ProductReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductReconciliation_plateform_idx" ON "ProductReconciliation"("plateform");

-- CreateIndex
CREATE INDEX "ProductReconciliation_productId_idx" ON "ProductReconciliation"("productId");

-- AddForeignKey
ALTER TABLE "ProductReconciliation" ADD CONSTRAINT "ProductReconciliation_plateform_fkey" FOREIGN KEY ("plateform") REFERENCES "Plateform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReconciliation" ADD CONSTRAINT "ProductReconciliation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
