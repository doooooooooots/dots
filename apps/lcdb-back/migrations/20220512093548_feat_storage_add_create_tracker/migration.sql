-- AlterTable
ALTER TABLE "Storage" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT;

-- CreateIndex
CREATE INDEX "Storage_createdBy_idx" ON "Storage"("createdBy");

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
