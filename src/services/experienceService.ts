import * as experienceRepository from "../repositories/experienceRepositry.js";
import { CreateExperienceData } from "../repositories/experienceRepositry.js";

export async function postExperience(experience: CreateExperienceData, user_id: number) {
    const categoryId = await experienceRepository.findCategoryById(experience.category_id);
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
