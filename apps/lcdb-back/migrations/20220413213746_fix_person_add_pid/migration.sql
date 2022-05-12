-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "pid" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE INDEX "Person_pid_idx" ON "Person"("pid");
