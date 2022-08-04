import { Request, Response } from "express";
import * as experienceService from "../services/experienceService.js";
import { CreateExperienceData } from "../repositories/experienceRepositry.js";

export async function postExperience(req: Request, res: Response) {
  const experience: CreateExperienceData = req.body;
  const user_id: number = res.locals.user.id;

  await experienceService.postExperience(experience, user_id);
  return res.sendStatus(201);
}
