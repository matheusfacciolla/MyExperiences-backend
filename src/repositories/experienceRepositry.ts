import prisma from "../config/database.js";
import { experiences } from "@prisma/client";

export type CreateExperienceData = Omit<
  experiences,
  "id" | "user_id" | "created_at"
>;

export async function findCategoryById(category_id: number) {
  const categoryName = await prisma.categories.findUnique({
    where: { id: category_id },
  });
  return categoryName;
}

export async function findExperienceByTitle(title: string) {
  const experienceByTitle = await prisma.experiences.findFirst({
    where: { title: title },
  });
  return experienceByTitle;
}

export async function postExperience(
  experience: CreateExperienceData,
  user_id: number
) {
  const experienceByTitle = await prisma.experiences.create({
    data: { ...experience, user_id },
  });
  return experienceByTitle;
}

export async function getAllExperiences(user_id: number) {
  const experiences = await prisma.categories.findMany({
    select: {
      category: true,
      experiences: {
        where: {
          user_id
        },
        select: {
          title: true,
          place: true,
          date: true,
          description: true,
        },
      },
    },
  });

  return experiences;
}
