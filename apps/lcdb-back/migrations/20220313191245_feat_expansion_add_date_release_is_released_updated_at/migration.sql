-- AlterTable
ALTER TABLE "Expansion" ADD COLUMN     "dateRelease" TIMESTAMP(3),
ADD COLUMN     "isReleased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
