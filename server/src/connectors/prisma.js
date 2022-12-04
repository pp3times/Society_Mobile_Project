const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // ... your Prisma Client queries will go here

  // test get table
  const response = await prisma.table.findMany({
    where: {
      barId: 1,
    },
  })

  console.log(response)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
