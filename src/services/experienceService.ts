import { experienceRepository, CreateExperienceData } from "../repositories/experienceRepositry.js";
import { categoriesRepository, } from "../repositories/categoriesRepository.js";

export async function postExperience(
  experience: CreateExperienceData,
  user_id: number
) {
  const categoryId = await categoriesRepository.findCategoryById(
    experience.category_id
  );
  if (!categoryId) {
    throw {
      type: "Not_Found",
      message: "Category not found!",
    };
  }

  const experienceByTitle = await experienceRepository.findExperienceByTitle(
    experience.title
  );
  if (experienceByTitle) {
    throw {
      type: "Conflict",
      message: "This experience is already registered!",
    };
  }

  await experienceRepository.postExperience(experience, user_id);
}

export async function getAllExperiences(user_id: number) {
  await experienceRepository.getAllExperiences(user_id);
}

export async function deleteExperienceById(
  user_id: number,
  experience_id: number
) {
  const experienceById = await experienceRepository.findExperienceById(
    experience_id
  );

  if (!experienceById) {
    throw {
      type: "Not_Found",
      message: "Experience not found!",
    };
  }

  await experienceRepository.deleteExperienceById(
    user_id,
    experience_id
  );
}

export const experienceService = {
  postExperience,
  getAllExperiences,
  deleteExperienceById,
};