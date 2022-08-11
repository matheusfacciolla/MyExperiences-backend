import prisma from "../config/database.js";
import { experiences } from "@prisma/client";

export type CreateExperienceData = Omit<
  experiences,
  "id" | "user_id" | "created_at"
>;

export async function findExperienceByTitle(title: string) {
  const experienceByTitle = await prisma.experiences.findFirst({
    where: { title },
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
      id:true,
      category: true,
      experiences: {
        where: {
          user_id
        },
        select: {
          id: true,
          title: true,
          place: true,
          date: true,
          description: true,
        },
      },
      planned_experiences: {
        where: {
          user_id,
          done: true
        },
        select: {
          id: true,
          title: true,
          place: true,
          date: true,
          description: true,
          done: true
        },
      }
    },
  });

  return experiences;
}
