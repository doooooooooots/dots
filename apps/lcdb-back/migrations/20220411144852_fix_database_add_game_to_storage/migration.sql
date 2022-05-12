-- AlterTable
ALTER TABLE "Storage" ADD COLUMN     "game" TEXT;

-- CreateIndex
CREATE INDEX "Storage_game_idx" ON "Storage"("game");

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_game_fkey" FOREIGN KEY ("game") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
