/*
  Warnings:

  - You are about to drop the column `pid` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `idMkm` on the `Expansion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_pid_key";

-- DropIndex
DROP INDEX "Expansion_idMkm_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "pid";

-- AlterTable
ALTER TABLE "Expansion" DROP COLUMN "idMkm";
