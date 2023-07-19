const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const seedCards = async () => {
  try {
    await prisma.card.deleteMany();

    const characters = await prisma.character.findMany({
      select: { id: true },
    });

    const cardsData = characters.map((character) => ({
      characterId: character.id,
    }));

    await prisma.card.createMany({
      data: cardsData,
      skipDuplicates: true,
    });

    console.log('Cards seeding completed.');
  } catch (error) {
    console.error('Error seeding Cards:', error);
  }
};
