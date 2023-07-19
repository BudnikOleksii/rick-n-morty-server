import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedRoles = async () => {
  try {
    await prisma.role.deleteMany();
    const roles: Prisma.RoleCreateInput[] = [
      { value: 'ADMIN', description: 'Can assign roles to other users' },
      { value: 'USER', description: 'Regular user' },
    ];

    await prisma.role.createMany({
      data: roles,
      skipDuplicates: true,
    });

    console.log('Roles seeding completed.');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};
