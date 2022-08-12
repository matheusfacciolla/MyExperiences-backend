import { Router } from "express";
import { postPlannedExperience, getAllPlannedExperiences, updatePlannedExperiences, deletePlannedExperienceById } from "../controllers/plannedExperiencesController.js";
import { plannedExperienceSchema } from "../schemas/plannedExperienceSchema.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const plannedExperienceRouter = Router();

plannedExperienceRouter.post("/experiences/planned/create",ensureAuthenticatedMiddleware, schemaValidator(plannedExperienceSchema), postPlannedExperience);
plannedExperienceRouter.get("/experiences/planned",ensureAuthenticatedMiddleware, getAllPlannedExperiences);
plannedExperienceRouter.put("/experiences/planned",ensureAuthenticatedMiddleware, updatePlannedExperiences);
plannedExperienceRouter.delete("/experiences/planned/delete/:id",ensureAuthenticatedMiddleware, deletePlannedExperienceById);

export default plannedExperienceRouter;