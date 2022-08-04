import { Router } from "express";
import { postExperience } from "../controllers/experiencesController.js";
import { experienceSchema } from "../schemas/experienceSchema.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const experienceRouter = Router();

experienceRouter.post("/experiences/create",ensureAuthenticatedMiddleware, schemaValidator(experienceSchema), postExperience);

export default experienceRouter;