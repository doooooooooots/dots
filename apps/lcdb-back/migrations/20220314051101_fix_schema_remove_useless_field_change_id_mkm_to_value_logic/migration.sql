/*
  Warnings:

  - You are about to drop the column `action` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `controlAction` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `idMkm` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `idMkm` on the `Rarity` table. All the data in the column will be lost.
  - You are about to drop the column `ratingValue` on the `Rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_action_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_controlAction_fkey";

-- DropIndex
DROP INDEX "Comment_action_idx";

-- DropIndex
DROP INDEX "Comment_controlAction_idx";

-- DropIndex
DROP INDEX "Language_idMkm_key";

-- DropIndex
DROP INDEX "Rarity_idMkm_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "action",
DROP COLUMN "controlAction";

-- AlterTable
ALTER TABLE "Condition" ADD COLUMN     "value" INTEGER;

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "idMkm",
DROP COLUMN "identifier",
ADD COLUMN     "code" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "value" INTEGER;

-- AlterTable
ALTER TABLE "Rarity" DROP COLUMN "idMkm",
ADD COLUMN     "value" INTEGER;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "ratingValue",
ADD COLUMN     "value" INTEGER;

-- CreateTable
CREATE TABLE "_Action_comments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ControlAction_comments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Action_comments_AB_unique" ON "_Action_comments"("A", "B");

-- CreateIndex
CREATE INDEX "_Action_comments_B_index" ON "_Action_comments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ControlAction_comments_AB_unique" ON "_ControlAction_comments"("A", "B");

-- CreateIndex
CREATE INDEX "_ControlAction_comments_B_index" ON "_ControlAction_comments"("B");

-- CreateIndex
CREATE INDEX "Condition_value_idx" ON "Condition"("value");

-- CreateIndex
CREATE INDEX "Language_value_idx" ON "Language"("value");

-- CreateIndex
CREATE INDEX "Rarity_value_idx" ON "Rarity"("value");

-- AddForeignKey
ALTER TABLE "_Action_comments" ADD FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Action_comments" ADD FOREIGN KEY ("B") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ControlAction_comments" ADD FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ControlAction_comments" ADD FOREIGN KEY ("B") REFERENCES "ControlAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
