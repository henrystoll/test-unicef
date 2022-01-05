import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const orgsData: Prisma.OrgCreateInput[] = [
  {
    url: 'test01.org',
    name: 'Test Org 01',
    users: {
      create: [
        {
          name: 'Alice',
          email: 'alice@test01.org',
        },
        {
          name: 'Nilu',
          email: 'nilu@test01.org',
        },
      ],
    },
  },
  {
    url: 'test02.org',
    name: 'Test Org 02',
    users: {
      create: [
        {
          name: 'Mahmoud',
          email: 'Mahmoud@test02.org',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const orgData of orgsData) {
    const org = await prisma.org.create({
      data: orgData,
    })
    console.log(`Created user with id: ${org.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
