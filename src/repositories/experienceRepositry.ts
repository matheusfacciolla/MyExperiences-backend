import prisma from "../config/database.js";
import { experiences } from "@prisma/client";

export type CreateExperienceData = Omit<
  experiences,
  "id" | "user_id" | "created_at"
>;

async function findExperienceByTitle(title: string) {
  const experienceByTitle = await prisma.experiences.findFirst({
    where: { title },
  });
  return experienceByTitle;
}

async function postExperience(
  experience: CreateExperienceData,
  user_id: number
) {
  const experienceByTitle = await prisma.experiences.create({
    data: { ...experience, user_id },
  });
  return experienceByTitle;
}

async function getAllExperiences(user_id: number) {
  const experiences = await prisma.categories.findMany({
    select: {
      id: true,
      category: true,
      experiences: {
        where: {
          user_id,
        },
        select: {
          id: true,
          title: true,
          place: true,
          date: true,
          description: true,
        },
        orderBy: {
          date: "desc",
        },
      },
      planned_experiences: {
        where: {
          user_id,
          done: true,
        },
        select: {
          id: true,
          title: true,
          place: true,
          date: true,
          description: true,
          done: true,
        },
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  return experiences;
}

async function findExperienceById(experience_id: number) {
  const experienceById = await prisma.experiences.findFirst({
    where: { id: experience_id },
  });
  return experienceById;
}

async function deleteExperienceById(user_id: number, experience_id: number) {
  const res = await prisma.experiences.deleteMany({
    where: {
      id: experience_id,
      user_id: user_id,
    },
  });

  return res;
}

export const experienceRepository = {
  findExperienceByTitle,
  postExperience,
  getAllExperiences,
  findExperienceById,
  deleteExperienceById,
};
