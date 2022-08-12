import * as experienceRepository from "../repositories/experienceRepositry.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import { CreateExperienceData } from "../repositories/experienceRepositry.js";

export async function postExperience(experience: CreateExperienceData, user_id: number) {
    const categoryId = await categoriesRepository.findCategoryById(experience.category_id);
    if (!categoryId) {
      throw {
        type: "Not_Found",
        message: "Category not found!",
      };
    }

    const experienceByTitle = await experienceRepository.findExperienceByTitle(experience.title);
    if (experienceByTitle) {
      throw {
        type: "Conflict",
        message: "This experience is already registered!",
      };
    }

    await experienceRepository.postExperience(experience, user_id);
}

export async function getAllExperiences(user_id: number) {
  const experiences = await experienceRepository.getAllExperiences(user_id);
  return experiences;
}

export async function deleteExperienceById(user_id: number, experience_id: number) {
  await experienceRepository.deleteExperienceById(user_id, experience_id);
}