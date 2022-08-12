import { Router } from "express";
import { postExperience, getAllExperiences, deleteExperienceById } from "../controllers/experiencesController.js";
import { experienceSchema } from "../schemas/experienceSchema.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const experienceRouter = Router();

experienceRouter.post("/experiences/create",ensureAuthenticatedMiddleware, schemaValidator(experienceSchema), postExperience);
experienceRouter.get("/experiences",ensureAuthenticatedMiddleware, getAllExperiences);
experienceRouter.delete("/experiences/delete/:id",ensureAuthenticatedMiddleware, deleteExperienceById);

export default experienceRouter;