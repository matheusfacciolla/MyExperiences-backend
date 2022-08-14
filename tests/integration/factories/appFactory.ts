import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import prisma from "../../../src/config/database.js";

export function createSignUp(email = "teste@gmail.com", passwordLength = 5) {
  const password = faker.internet.password(passwordLength);
  const name = faker.name.firstName();
  return {
    email,
    password,
    name,
  };
}

interface Login {
  email: string;
  password: string;
  name: string;
}

export function createExperienceInput() {
  const title = faker.lorem.sentence(1);
  const place = faker.address.cityName();
  const date = "12/08/2022";
  const description = faker.lorem.sentence(1);
  const category_id = faker.datatype.number({ min: 1, max: 4 });

  return { title, place, date, description, category_id };
}

export function createPlannedExperienceInput() {
  const title = faker.lorem.sentence(1);
  const place = faker.address.cityName();
  const date = "30/08/2022";
  const description = faker.lorem.sentence(1);
  const category_id = faker.datatype.number({ min: 1, max: 4 });

  return { title, place, date, description, category_id };
}

interface Login {
  email: string;
  password: string;
  name: string;
}

export async function createUser(login: Login) {
  const password = bcrypt.hashSync(login.password, 10);
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password,
      name: login.name,
    },
  });

  return user;
}
