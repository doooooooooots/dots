/*
  Warnings:

  - The `decimalDigits` column on the `Currency` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "decimalDigits",
ADD COLUMN     "decimalDigits" INTEGER;
