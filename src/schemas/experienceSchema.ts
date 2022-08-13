import joi from "joi";
import { CreateExperienceData } from "../repositories/experienceRepositry.js";

export const experienceSchema = joi.object<CreateExperienceData>({
  title: joi.string().required().max(20),
  place: joi.string().required().max(20),
  date: joi.string().required().min(8),
  description: joi.string().required().max(30),
  category_id: joi.number().required()
});