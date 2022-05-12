-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "capital" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "emoji" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "emojiU" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "native" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "phone" INTEGER;

-- AlterTable
ALTER TABLE "CountryGroup" ADD COLUMN     "code" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "decimalDigits" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "namePlural" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "symbol" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "symbolNative" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "native" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "rtl" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_Country_languages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Country_languages_AB_unique" ON "_Country_languages"("A", "B");

-- CreateIndex
CREATE INDEX "_Country_languages_B_index" ON "_Country_languages"("B");

-- CreateIndex
CREATE INDEX "Country_currency_idx" ON "Country"("currency");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currency_fkey" FOREIGN KEY ("currency") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Country_languages" ADD FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Country_languages" ADD FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
