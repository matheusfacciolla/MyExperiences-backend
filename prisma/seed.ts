import prisma from "../src/config/database.js";

async function main() {
  const categories = [
    { category: "sports" },
    { category: "shows" },
    { category: "trips" },
    { category: "others" },
  ];

  await prisma.categories.createMany({ data: categories });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
