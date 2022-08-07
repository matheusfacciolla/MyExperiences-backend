import * as plannedExperienceRepository from "../repositories/plannedExperienceRepository.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import { CreatePlannedExperienceData } from "../repositories/plannedExperienceRepository.js";

export async function postPlannedExperience(plannedExperience: CreatePlannedExperienceData, user_id: number) {
    const categoryId = await categoriesRepository.findCategoryById(plannedExperience.category_id);
    if (!categoryId) {
      throw {
        type: "Not_Found",
        message: "Category not found!",
      };
    }

    const plannedExperienceByTitle = await plannedExperienceRepository.findPlannedExperienceByTitle(plannedExperience.title);
    if (plannedExperienceByTitle) {
      throw {
        type: "Conflict",
        message: "This planning is already registered!",
      };
    }

    await plannedExperienceRepository.postPlannedExperience(plannedExperience, user_id);
}

export async function getAllPlannedExperiences(user_id: number) {
  const experiences = await plannedExperienceRepository.getAllPlannedExperiences(user_id);
  return experiences;
}