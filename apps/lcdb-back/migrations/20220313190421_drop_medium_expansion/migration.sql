/*
  Warnings:

  - Made the column `icon` on table `Expansion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expansion" DROP CONSTRAINT "Expansion_icon_fkey";

-- DropIndex
DROP INDEX "Expansion_icon_idx";

-- AlterTable
ALTER TABLE "Expansion" ALTER COLUMN "icon" SET NOT NULL,
ALTER COLUMN "icon" SET DEFAULT E'';
