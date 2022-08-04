import { Router } from "express";
import authRouter from "./authRouter.js";
import experienceRouter from "./experienceRouter.js";

const router = Router();
router.use(authRouter);
router.use(experienceRouter)

export default router;