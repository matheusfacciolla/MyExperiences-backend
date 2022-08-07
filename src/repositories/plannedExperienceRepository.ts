import prisma from "../config/database.js";
import { planned_experiences } from "@prisma/client";

export type CreatePlannedExperienceData = Omit<
  planned_experiences,
  "id" | "user_id" | "created_at"
>;

export async function findPlannedExperienceByTitle(title: string) {
  const plannedExperienceByTitle = await prisma.planned_experiences.findFirst({
    where: { title },
  });
  return plannedExperienceByTitle;
}

export async function postPlannedExperience(
  experience: CreatePlannedExperienceData,
  user_id: number
) {
  const plannedExperienceByTitle = await prisma.planned_experiences.create({
    data: { ...experience, user_id },
  });
  return plannedExperienceByTitle;
}

export async function getAllPlannedExperiences(user_id: number) {
  const experiences = await prisma.categories.findMany({
    select: {
      category: true,
      planned_experiences: {
        where: {
          user_id,
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
