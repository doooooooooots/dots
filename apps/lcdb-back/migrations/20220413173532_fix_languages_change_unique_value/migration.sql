-- DropIndex
DROP INDEX "Language_idMkm_key";

-- CreateIndex
CREATE INDEX "Language_idMkm_idx" ON "Language"("idMkm");
