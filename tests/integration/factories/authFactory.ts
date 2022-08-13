import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import prisma from "../../../src/config/database.js";

export function createSignUp(email = "teste@gmail.com", passwordLength = 5) {
  const password = faker.internet.password(passwordLength);
  const name = faker.name.firstName();
  return {
    email,
    password,
    name
  };
}

interface Login {
  email: string;
  password: string;
  name: string;
}


export async function createUser(login: Login){
  const password = bcrypt.hashSync(login.password, 10);
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password,
      name: login.name
    }
  });

  return user;
}