import { plannedExperienceRepository } from "../repositories/plannedExperienceRepository.js";
import { categoriesRepository } from "../repositories/categoriesRepository.js";
import { CreatePlannedExperienceData } from "../repositories/plannedExperienceRepository.js";
import { planned_experiences } from "@prisma/client";

async function postPlannedExperience(
  plannedExperience: CreatePlannedExperienceData,
  user_id: number
) {
  const categoryId = await categoriesRepository.findCategoryById(
    plannedExperience.category_id
  );
  if (!categoryId) {
    throw {
      type: "Not_Found",
      message: "Category not found!",
    };
  }

  const plannedExperienceByTitle =
    await plannedExperienceRepository.findPlannedExperienceByTitle(
      plannedExperience.title
    );
  if (plannedExperienceByTitle) {
    throw {
      type: "Conflict",
      message: "This planning is already registered!",
    };
  }

  await plannedExperienceRepository.postPlannedExperience(
    plannedExperience,
    user_id
  );
}

async function getAllPlannedExperiences(user_id: number) {
  const experiences =
    await plannedExperienceRepository.getAllPlannedExperiences(user_id);
}

async function updatePlannedExperiences(
  user_id: number,
  plannedExperience: planned_experiences
) {
  const experiences =
    await plannedExperienceRepository.updatePlannedExperiences(
      user_id,
      plannedExperience
    );
}

async function deletePlannedExperienceById(
  user_id: number,
  plannedExperience_id: number
) {
  const plannedExperienceById =
    await plannedExperienceRepository.findPlannedExperienceById(
      plannedExperience_id
    );

  if (!plannedExperienceById) {
    throw {
      type: "Not_Found",
      message: "Planned Experience not found!",
    };
  }

  const res = await plannedExperienceRepository.deletePlannedExperienceById(
    user_id,
    plannedExperience_id
  );
}

export const plannedExperienceService = {
  postPlannedExperience,
  getAllPlannedExperiences,
  updatePlannedExperiences,
  deletePlannedExperienceById,
};
