import joi from "joi";
import { CreateUserData } from "../repositories/authRepository";

const signUpSchema = joi.object<CreateUserData>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(5),
});

const signInSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const authSchema = {
  signUpSchema,
  signInSchema,
};
