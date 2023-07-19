/*
  Warnings:

  - The primary key for the `CharacterEpisode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `character_id` on the `CharacterEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `episode_id` on the `CharacterEpisode` table. All the data in the column will be lost.
  - The primary key for the `LocationCharacter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `character_id` on the `LocationCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `LocationCharacter` table. All the data in the column will be lost.
  - The primary key for the `SetCharacter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `character_id` on the `SetCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `set_id` on the `SetCharacter` table. All the data in the column will be lost.
  - Added the required column `characterId` to the `CharacterEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodeId` to the `CharacterEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `LocationCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `LocationCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `SetCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setId` to the `SetCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CharacterEpisode" DROP CONSTRAINT "CharacterEpisode_character_id_fkey";

-- DropForeignKey
ALTER TABLE "CharacterEpisode" DROP CONSTRAINT "CharacterEpisode_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "LocationCharacter" DROP CONSTRAINT "LocationCharacter_character_id_fkey";

-- DropForeignKey
ALTER TABLE "LocationCharacter" DROP CONSTRAINT "LocationCharacter_location_id_fkey";

-- DropForeignKey
ALTER TABLE "SetCharacter" DROP CONSTRAINT "SetCharacter_character_id_fkey";

-- DropForeignKey
ALTER TABLE "SetCharacter" DROP CONSTRAINT "SetCharacter_set_id_fkey";

-- AlterTable
ALTER TABLE "CharacterEpisode" DROP CONSTRAINT "CharacterEpisode_pkey",
DROP COLUMN "character_id",
DROP COLUMN "episode_id",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "episodeId" INTEGER NOT NULL,
ADD CONSTRAINT "CharacterEpisode_pkey" PRIMARY KEY ("characterId", "episodeId");

-- AlterTable
ALTER TABLE "LocationCharacter" DROP CONSTRAINT "LocationCharacter_pkey",
DROP COLUMN "character_id",
DROP COLUMN "location_id",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD CONSTRAINT "LocationCharacter_pkey" PRIMARY KEY ("locationId", "characterId");

-- AlterTable
ALTER TABLE "SetCharacter" DROP CONSTRAINT "SetCharacter_pkey",
DROP COLUMN "character_id",
DROP COLUMN "set_id",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "setId" INTEGER NOT NULL,
ADD CONSTRAINT "SetCharacter_pkey" PRIMARY KEY ("setId", "characterId");

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "ownerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lot" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "initialPrice" INTEGER NOT NULL,
    "currentPrice" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minActionDuration" INTEGER NOT NULL DEFAULT 300000,
    "maxActionDuration" INTEGER NOT NULL DEFAULT 300000,
    "minStep" INTEGER NOT NULL,
    "maxPrice" INTEGER NOT NULL,
    "lastPersonToBetId" INTEGER,
    "activated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "lot_id" INTEGER,
    "seller_id" INTEGER,
    "purchaser_id" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "systemFee" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_cards_character_id" ON "Card"("characterId");

-- CreateIndex
CREATE INDEX "idx_lots_card_id" ON "Lot"("cardId");

-- CreateIndex
CREATE INDEX "idx_transactions_lot_id" ON "Transaction"("lot_id");

-- CreateIndex
CREATE INDEX "idx_transactions_seller_id" ON "Transaction"("seller_id");

-- CreateIndex
CREATE INDEX "idx_transactions_purchaser_id" ON "Transaction"("purchaser_id");

-- AddForeignKey
ALTER TABLE "LocationCharacter" ADD CONSTRAINT "LocationCharacter_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationCharacter" ADD CONSTRAINT "LocationCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEpisode" ADD CONSTRAINT "CharacterEpisode_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEpisode" ADD CONSTRAINT "CharacterEpisode_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetCharacter" ADD CONSTRAINT "SetCharacter_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetCharacter" ADD CONSTRAINT "SetCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lot" ADD CONSTRAINT "Lot_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lot" ADD CONSTRAINT "Lot_lastPersonToBetId_fkey" FOREIGN KEY ("lastPersonToBetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "Lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_purchaser_id_fkey" FOREIGN KEY ("purchaser_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
