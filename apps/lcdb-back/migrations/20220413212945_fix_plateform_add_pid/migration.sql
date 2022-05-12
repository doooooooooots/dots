/*
  Warnings:

  - A unique constraint covering the columns `[pid]` on the table `Plateform` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Plateform" ADD COLUMN     "pid" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Plateform_pid_key" ON "Plateform"("pid");
