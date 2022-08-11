import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(authSchema.signUpSchema), signUp);
authRouter.post("/", schemaValidator(authSchema.signInSchema), signIn);

export default authRouter;