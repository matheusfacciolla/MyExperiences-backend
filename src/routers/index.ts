import { Router } from "express";
import authRouter from "./authRouter.js";
import experienceRouter from "./experienceRouter.js";
import plannedExperienceRouter from "./plannedExperienceRouter.js";

const router = Router();
router.use(authRouter);
router.use(experienceRouter);
router.use(plannedExperienceRouter);

export default router;