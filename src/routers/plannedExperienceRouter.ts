import { Router } from "express";
import { postPlannedExperience, getAllPlannedExperiences } from "../controllers/plannedExperiencesController.js";
import { plannedExperienceSchema } from "../schemas/plannedExperienceSchema.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const plannedExperienceRouter = Router();

plannedExperienceRouter.post("/experiences/planned/create",ensureAuthenticatedMiddleware, schemaValidator(plannedExperienceSchema), postPlannedExperience);
plannedExperienceRouter.get("/experiences/planned/get",ensureAuthenticatedMiddleware, getAllPlannedExperiences);

export default plannedExperienceRouter;