import joi from "joi";
import { CreatePlannedExperienceData } from "../repositories/plannedExperienceRepository.js";

export const plannedExperienceSchema = joi.object<CreatePlannedExperienceData>({
  title: joi.string().required().max(20),
  place: joi.string().required().max(20),
  date: joi.string().required().min(8),
  description: joi.string().required().max(30),
  category_id: joi.number().required()
});