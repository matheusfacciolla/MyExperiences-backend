import joi from "joi";
import { CreatePlannedExperienceData } from "../repositories/plannedExperienceRepository.js";

export const plannedExperienceSchema = joi.object<CreatePlannedExperienceData>({
  title: joi.string().required().max(30),
  place: joi.string().required().max(20),
  date: joi.string().required().min(10),
  description: joi.string().required().max(40),
  category_id: joi.number().required()
});