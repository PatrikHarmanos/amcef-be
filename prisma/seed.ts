import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const fakerUser = (): any => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone_number: faker.phone.number(),
  email: faker.internet.email(),
  address: faker.address.cityName(),
  note: faker.lorem.sentence(1),
});

async function main() {
  const fakerRounds = 100;
  dotenv.config();
  console.log('Seeding...');
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.contact.create({ data: fakerUser() });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
