import app from "../../src/app.js";
import supertest from "supertest";
import prisma from "../../src/config/database.js";

import * as authFactory from "./factories/authFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@gmail.com'`;
});

describe("sign-up tests", () => {
  it("given email,password and name, create a user", async () => {
    const login = authFactory.createSignUp();

    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already in use, fail to create a user", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);

    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(409);
  });

  it("given invalid input, fail to create a user", async () => {
    const login = authFactory.createSignUp();
    delete login.password;
    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(422);
  });
});

describe("sign-in tests", () => {
  it("given valid email and password, receive a token", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.name;

    const response = await supertest(app).post("/").send(login);
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("given invalid password, fail to login", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.name;
    login.password = "differentpassword";

    const response = await supertest(app).post("/").send(login);
    expect(response.status).toBe(401);
  });

  it("given invalid input, fail to login", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.name;
    delete login.password;
    delete login.email;

    const response = await supertest(app).post("/").send(login);
    expect(response.statusCode).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
