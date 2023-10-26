/*
  Warnings:

  - You are about to drop the column `lot_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `purchaser_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_lot_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_purchaser_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_seller_id_fkey";

-- DropIndex
DROP INDEX "idx_transactions_lot_id";

-- DropIndex
DROP INDEX "idx_transactions_purchaser_id";

-- DropIndex
DROP INDEX "idx_transactions_seller_id";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "lot_id",
DROP COLUMN "purchaser_id",
DROP COLUMN "seller_id",
ADD COLUMN     "lotId" INTEGER,
ADD COLUMN     "purchaserId" INTEGER,
ADD COLUMN     "sellerId" INTEGER;

-- CreateIndex
CREATE INDEX "idx_transactions_lotId" ON "Transaction"("lotId");

-- CreateIndex
CREATE INDEX "idx_transactions_sellerId" ON "Transaction"("sellerId");

-- CreateIndex
CREATE INDEX "idx_transactions_purchaserId" ON "Transaction"("purchaserId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_purchaserId_fkey" FOREIGN KEY ("purchaserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_cards_character_id" RENAME TO "idx_cards_characterId";

-- RenameIndex
ALTER INDEX "idx_lots_card_id" RENAME TO "idx_lots_cardId";
