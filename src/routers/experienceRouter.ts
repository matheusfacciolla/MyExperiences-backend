import { Router } from "express";
import { postExperience, getAllExperiences } from "../controllers/experiencesController.js";
import { experienceSchema } from "../schemas/experienceSchema.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const experienceRouter = Router();

experienceRouter.post("/experiences/create",ensureAuthenticatedMiddleware, schemaValidator(experienceSchema), postExperience);
experienceRouter.get("/experiences",ensureAuthenticatedMiddleware, getAllExperiences);

export default experienceRouter;