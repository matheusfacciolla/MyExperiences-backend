import { Request, Response } from "express";
import * as plannedExperienceService from "../services/plannedExperienceService.js";
import { CreatePlannedExperienceData } from "../repositories/plannedExperienceRepository.js";
import { planned_experiences } from "@prisma/client";

export async function postPlannedExperience(req: Request, res: Response) {
  const plannedExperience: CreatePlannedExperienceData = req.body;
  const user_id: number = res.locals.user.id;

  await plannedExperienceService.postPlannedExperience(plannedExperience, user_id);
  return res.sendStatus(201);
}

export async function getAllPlannedExperiences(req: Request, res: Response) {
  const user_id: number = res.locals.user.id;

  const plannedExperiences = await plannedExperienceService.getAllPlannedExperiences(user_id);
  return res.status(200).send(plannedExperiences);
}

export async function updatePlannedExperiences(req: Request, res: Response) {
  const plannedExperience: planned_experiences = req.body;
  const user_id: number = res.locals.user.id;

  const plannedExperiences = await plannedExperienceService.updatePlannedExperiences(user_id, plannedExperience);
  return res.status(200).send(plannedExperiences);
}

export async function deletePlannedExperienceById(req: Request, res: Response) {
  const user_id: number = res.locals.user.id;
  const id = req.params.id;

  const plannedExperience_id = parseInt(id)

  await plannedExperienceService.deletePlannedExperienceById(user_id, plannedExperience_id);
  return res.status(200);
}