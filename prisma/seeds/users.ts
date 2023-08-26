import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const LOCAL_ADMIN_PASSWORD = '123456';
const LOCAL_USER_PASSWORD = '123456';
const SALT_ROUNDS = 7;

export const seedUsers = async () => {
  try {
    await prisma.user.deleteMany();
    const users: Prisma.UserCreateInput[] = [
      {
        username: 'Main admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash(LOCAL_ADMIN_PASSWORD, SALT_ROUNDS),
        ip: '0.0.0.0',
        activated: true,
      },
      {
        username: 'Test user',
        email: 'user@gmail.com',
        password: await bcrypt.hash(LOCAL_USER_PASSWORD, SALT_ROUNDS),
        ip: '0.0.0.0',
        activated: true,
      },
    ];

    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log('Users seeding completed.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
