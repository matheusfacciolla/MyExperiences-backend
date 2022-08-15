import { Request, Response } from "express";
import * as experienceService from "../services/experienceService.js";
import { CreateExperienceData } from "../repositories/experienceRepositry.js";

export async function postExperience(req: Request, res: Response) {
  const experience: CreateExperienceData = req.body;
  const user_id: number = res.locals.user.id;

  await experienceService.postExperience(experience, user_id);
  return res.sendStatus(201);
}

export async function getAllExperiences(req: Request, res: Response) {
  const user_id: number = res.locals.user.id;

  const experiences = await experienceService.getAllExperiences(user_id);
  return res.status(200).send(experiences);
}

export async function deleteExperienceById(req: Request, res: Response) {
  const user_id: number = res.locals.user.id;
  const id = req.params.id;

  const experience_id = parseInt(id)

  await experienceService.deleteExperienceById(user_id, experience_id);
  return res.sendStatus(200);
}
