/*
  Warnings:

  - You are about to drop the column `numberText` on the `Product` table. All the data in the column will be lost.
  - Made the column `number` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "numberText",
ALTER COLUMN "number" SET NOT NULL,
ALTER COLUMN "number" SET DEFAULT E'',
ALTER COLUMN "number" SET DATA TYPE TEXT;
