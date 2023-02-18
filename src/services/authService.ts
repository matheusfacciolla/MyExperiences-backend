import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository, CreateUserData } from "../repositories/authRepository.js";
import { users } from "@prisma/client";

export type CreateUserInfo = Omit<users, "created_at">;

export async function signUp(user: CreateUserData) {
  const isEmailExist = await authRepository.findUserByEmail(user.email);
  const SALT = 10;

  if (!isEmailExist) {
    user.password = bcrypt.hashSync(user.password, SALT);
    return await authRepository.createUser(user);
  } else {
    throw {
      type: "Conflict",
      message: "E-mail already exist",
    };
  }
}

export async function signIn(user: CreateUserData) {
  console.log("USER222 -> ", user)
  const userInfo: CreateUserInfo = await authRepository.findUserByEmail(user.email);
  console.log("USERINFO -> ", userInfo)
  const isCorrectPassword = bcrypt.compareSync(
    user.password,
    userInfo.password
  );
  console.log("ISCORRECTPASSWORD -> ", isCorrectPassword)

  if (!userInfo) {
    throw {
      type: "Not_Found",
      message: "E-mail not register",
    };
  }

  if (!isCorrectPassword) {
    throw {
      type: "Unauthorized",
      message: "Wrong password",
    };
  }

  const key = process.env.JWT_SECRET;
  console.log("KEY -> ", key)
  const expiresAt = { expiresIn: 60 * 60 * 24 };
  const token = jwt.sign(
    { id: userInfo.id, email: userInfo.email, name: userInfo.name },
    key,
    expiresAt
  );

  console.log("TOKEEEEN -> ", token)

  return token;
}

export async function findUserByEmail(user: CreateUserData) {
  const userInfo = await authRepository.findUserByEmail(user.email);

  return userInfo;
}

export const authService = {
  signUp,
  signIn,
  findUserByEmail,
};
