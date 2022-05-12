/*
  Warnings:

  - You are about to drop the column `mediaObject` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_mediaObject_fkey";

-- DropIndex
DROP INDEX "Link_mediaObject_idx";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "mediaObject",
DROP COLUMN "token",
ADD COLUMN     "targetId" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "MediaObject" ADD COLUMN     "extension" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "typeOf" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "_Product_links" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MediaObject_backlinks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Product_links_AB_unique" ON "_Product_links"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_links_B_index" ON "_Product_links"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MediaObject_backlinks_AB_unique" ON "_MediaObject_backlinks"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaObject_backlinks_B_index" ON "_MediaObject_backlinks"("B");

-- AddForeignKey
ALTER TABLE "_Product_links" ADD FOREIGN KEY ("A") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_links" ADD FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaObject_backlinks" ADD FOREIGN KEY ("A") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaObject_backlinks" ADD FOREIGN KEY ("B") REFERENCES "MediaObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
