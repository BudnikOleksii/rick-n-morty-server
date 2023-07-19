-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SetCharacter" (
    "set_id" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "SetCharacter_pkey" PRIMARY KEY ("set_id","character_id")
);

-- AddForeignKey
ALTER TABLE "SetCharacter" ADD CONSTRAINT "SetCharacter_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetCharacter" ADD CONSTRAINT "SetCharacter_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
