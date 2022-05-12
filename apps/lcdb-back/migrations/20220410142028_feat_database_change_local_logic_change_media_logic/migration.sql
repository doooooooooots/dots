/*
  Warnings:

  - You are about to drop the column `url` on the `MediaObject` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Local` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Local" DROP CONSTRAINT "Local_language_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_image_fkey";

-- DropForeignKey
ALTER TABLE "_Expansion_locals" DROP CONSTRAINT "_Expansion_locals_B_fkey";

-- DropForeignKey
ALTER TABLE "_Product_locals" DROP CONSTRAINT "_Product_locals_A_fkey";

-- DropForeignKey
ALTER TABLE "_Product_locals" DROP CONSTRAINT "_Product_locals_B_fkey";

-- DropIndex
DROP INDEX "Product_image_idx";

-- AlterTable
ALTER TABLE "MediaObject" DROP COLUMN "url",
ADD COLUMN     "alt" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "imageToken" TEXT NOT NULL DEFAULT E'';

-- DropTable
DROP TABLE "Local";

-- CreateTable
CREATE TABLE "ExpansionLocal" (
    "id" TEXT NOT NULL,
    "language" TEXT,
    "name" TEXT NOT NULL DEFAULT E'',
    "imageToken" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ExpansionLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLocal" (
    "id" TEXT NOT NULL,
    "language" TEXT,
    "name" TEXT NOT NULL DEFAULT E'',
    "imageToken" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ProductLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT E'',
    "targetType" TEXT NOT NULL DEFAULT E'',
    "mediaObject" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExpansionLocal_language_idx" ON "ExpansionLocal"("language");

-- CreateIndex
CREATE INDEX "ProductLocal_language_idx" ON "ProductLocal"("language");

-- CreateIndex
CREATE INDEX "Link_mediaObject_idx" ON "Link"("mediaObject");

-- AddForeignKey
ALTER TABLE "ExpansionLocal" ADD CONSTRAINT "ExpansionLocal_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLocal" ADD CONSTRAINT "ProductLocal_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_mediaObject_fkey" FOREIGN KEY ("mediaObject") REFERENCES "MediaObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Expansion_locals" ADD FOREIGN KEY ("B") REFERENCES "ExpansionLocal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_locals" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_locals" ADD FOREIGN KEY ("B") REFERENCES "ProductLocal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
