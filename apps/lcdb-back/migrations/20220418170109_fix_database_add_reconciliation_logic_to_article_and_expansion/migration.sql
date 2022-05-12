-- AlterTable
ALTER TABLE "ProductReconciliation" ADD COLUMN     "localPid" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "ArticleReconciliation" (
    "id" TEXT NOT NULL,
    "plateform" TEXT,
    "articleId" TEXT,
    "localPid" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ArticleReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpansionReconciliation" (
    "id" TEXT NOT NULL,
    "plateform" TEXT,
    "expansionId" TEXT,
    "localPid" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ExpansionReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArticleReconciliation_plateform_idx" ON "ArticleReconciliation"("plateform");

-- CreateIndex
CREATE INDEX "ArticleReconciliation_articleId_idx" ON "ArticleReconciliation"("articleId");

-- CreateIndex
CREATE INDEX "ExpansionReconciliation_plateform_idx" ON "ExpansionReconciliation"("plateform");

-- CreateIndex
CREATE INDEX "ExpansionReconciliation_expansionId_idx" ON "ExpansionReconciliation"("expansionId");

-- AddForeignKey
ALTER TABLE "ArticleReconciliation" ADD CONSTRAINT "ArticleReconciliation_plateform_fkey" FOREIGN KEY ("plateform") REFERENCES "Plateform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleReconciliation" ADD CONSTRAINT "ArticleReconciliation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpansionReconciliation" ADD CONSTRAINT "ExpansionReconciliation_plateform_fkey" FOREIGN KEY ("plateform") REFERENCES "Plateform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpansionReconciliation" ADD CONSTRAINT "ExpansionReconciliation_expansionId_fkey" FOREIGN KEY ("expansionId") REFERENCES "Expansion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
