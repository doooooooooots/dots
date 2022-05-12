/*
  Warnings:

  - You are about to drop the `_Expansion_locals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Expansion_locals" DROP CONSTRAINT "_Expansion_locals_A_fkey";

-- DropForeignKey
ALTER TABLE "_Expansion_locals" DROP CONSTRAINT "_Expansion_locals_B_fkey";

-- AlterTable
ALTER TABLE "ExpansionLocal" ADD COLUMN     "expansion" TEXT;

-- DropTable
DROP TABLE "_Expansion_locals";

-- CreateIndex
CREATE INDEX "ExpansionLocal_expansion_idx" ON "ExpansionLocal"("expansion");

-- AddForeignKey
ALTER TABLE "ExpansionLocal" ADD CONSTRAINT "ExpansionLocal_expansion_fkey" FOREIGN KEY ("expansion") REFERENCES "Expansion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
