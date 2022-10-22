import prisma from "../config/database.js";

async function findCategoryById(category_id: number) {
  const categoryName = await prisma.categories.findUnique({
    where: { id: category_id },
  });

  return categoryName;
}

export const categoriesRepository = {
  findCategoryById
}
