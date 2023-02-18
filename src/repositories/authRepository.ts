import prisma from "../config/database.js";
import { users } from "@prisma/client";

export type CreateUserData = Omit<users, "created_at">;

async function findUserByEmail(email: string) {
  const user = await prisma.users.findFirst({ where: { email } });
  return user;
}

async function createUser(user: CreateUserData) {
  return await prisma.users.create({ data: user });
}

export const authRepository = {
  findUserByEmail, 
  createUser
}