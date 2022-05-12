/*
  Warnings:

  - You are about to drop the column `imageToken` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageToken",
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE INDEX "Product_image_idx" ON "Product"("image");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_image_fkey" FOREIGN KEY ("image") REFERENCES "MediaObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
