import app from "../../src/app.js";
import supertest from "supertest";
import prisma from "../../src/config/database.js";

import * as appFactory from "./factories/appFactory.js";
import * as scenarioFactory from "./factories/scenarioFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE experiences RESTART IDENTITY`;
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@gmail.com'`;
});

describe("sign-up tests", () => {
  it("given email,password and name, create a user", async () => {
    const login = appFactory.createSignUp();

    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already in use, fail to create a user", async () => {
    const login = appFactory.createSignUp();
    await appFactory.createUser(login);

    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(409);
  });

  it("given invalid input, fail to create a user", async () => {
    const login = appFactory.createSignUp();
    delete login.password;
    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(422);
  });
});

describe("sign-in tests", () => {
  it("given valid email and password, receive a token", async () => {
    const login = appFactory.createSignUp();
    await appFactory.createUser(login);
    delete login.name;

    const response = await supertest(app).post("/").send(login);
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("given invalid password, fail to login", async () => {
    const login = appFactory.createSignUp();
    await appFactory.createUser(login);
    delete login.name;
    login.password = "differentpassword";

    const response = await supertest(app).post("/").send(login);
    expect(response.status).toBe(401);
  });

  it("given invalid input, fail to login", async () => {
    const login = appFactory.createSignUp();
    await appFactory.createUser(login);
    delete login.name;
    delete login.password;
    delete login.email;

    const response = await supertest(app).post("/").send(login);
    expect(response.statusCode).toBe(422);
  });
});

describe("experience tests", () => {
  it("given valid input, without token fail to create a experience", async () => {
    const input = appFactory.createExperienceInput();

    const response = await supertest(app).post("/experiences/create").set('Authorization', `Bearer`).send(input);
    expect(response.statusCode).toBe(500);
  });

  it("given valid input, create a experience", async () => {
    const token = await scenarioFactory.scenarioUserLogged();
    const input = appFactory.createExperienceInput();

    const response = await supertest(app).post("/experiences/create").set('Authorization', `Bearer ${token}`).send(input);
    expect(response.statusCode).toBe(201);
  });

  it("given invalid input, fail to create a experience", async () => {
    const token = await scenarioFactory.scenarioUserLogged();
    const input = appFactory.createExperienceInput();
    delete input.title

    const response = await supertest(app).post("/experiences/create").set('Authorization', `Bearer ${token}`).send(input);
    expect(response.statusCode).toBe(422);
  });

  it("without token fail to get experiences", async () => {
    const response = await supertest(app).get("/experiences").set('Authorization', `Bearer`);
    expect(response.statusCode).toBe(500);
  });

  it("with token, get experiences", async () => {
    const token = await scenarioFactory.scenarioUserLogged();

    const response = await supertest(app).get("/experiences").set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  
  it("without token fail to delete experience", async () => {
    const scenario = await scenarioFactory.scenarioPlannedExperienceCreated();
    
    const response = await supertest(app).delete(`/experiences/planned/delete/${scenario.res.id}`).set('Authorization', `Bearer`);
    expect(response.statusCode).toBe(500);
  });

  // it("with token and valid id delete experience", async () => {
  //   const scenario = await scenarioFactory.scenarioExperienceCreated();

  //   const response = await supertest(app).delete(`/experiences/delete/1`).set('Authorization', `Bearer ${scenario.token}`)
  //   expect(response.statusCode).toBe(200);
  // });

  it("with token and invalid id fail to delete experience", async () => {
    const token = await scenarioFactory.scenarioUserLogged();

    const response = await supertest(app).delete(`/experiences/delete`).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("planned experience tests", () => {
  it("given valid input, without token fail to create a planned experience", async () => {
    const input = appFactory.createPlannedExperienceInput();

    const response = await supertest(app).post("/experiences/planned/create").set('Authorization', `Bearer`).send(input);
    expect(response.statusCode).toBe(500);
  });

  it("given valid input, create a planned experience", async () => {
    const token = await scenarioFactory.scenarioUserLogged();
    const input = appFactory.createPlannedExperienceInput();

    const response = await supertest(app).post("/experiences/planned/create").set('Authorization', `Bearer ${token}`).send(input);
    expect(response.statusCode).toBe(201);
  });

  it("given invalid input, fail to create a planned experience", async () => {
    const token = await scenarioFactory.scenarioUserLogged();
    const input = appFactory.createExperienceInput();
    delete input.title

    const response = await supertest(app).post("/experiences/planned/create").set('Authorization', `Bearer ${token}`).send(input);
    expect(response.statusCode).toBe(422);
  });

  it("without token fail to get planned experiences", async () => {
    const response = await supertest(app).get("/experiences/planned").set('Authorization', `Bearer`);
    expect(response.statusCode).toBe(500);
  });

  it("with token, get planned experiences", async () => {
    const token = await scenarioFactory.scenarioUserLogged();

    const response = await supertest(app).get("/experiences/planned").set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it("without token fail to mark as done a planned experience", async () => {
    const scenario = await scenarioFactory.scenarioPlannedExperienceCreated();

    const response = await supertest(app).put("/experiences/planned").set('Authorization', `Bearer`).send({id: scenario.res.id, done: false});
    expect(response.statusCode).toBe(500);
  });

  it("mark as done a planned experience", async () => {
    const scenario = await scenarioFactory.scenarioPlannedExperienceCreated();

    const response = await supertest(app).put("/experiences/planned").set('Authorization', `Bearer ${scenario.token}`).send({id: scenario.res.id, done: false});
    expect(response.statusCode).toBe(200);
  });

  it("without token fail to delete planned experience", async () => {
    const scenario = await scenarioFactory.scenarioPlannedExperienceCreated();

    const response = await supertest(app).delete(`/experiences/planned/delete/${scenario.res.id}`).set('Authorization', `Bearer`);
    expect(response.statusCode).toBe(500);
  });

  // it("with token and valid id delete planned experience", async () => {
  //   const scenario = await scenarioFactory.scenarioExperienceCreated();

  //   const response = await supertest(app).delete(`/experiences/delete/${scenario.res.id}`).set('Authorization', `Bearer ${scenario.token}`);
  //   expect(response.statusCode).toBe(200);
  // });

  it("with token and invalid id fail to delete planned experience", async () => {
    const token = await scenarioFactory.scenarioUserLogged();

    const response = await supertest(app).delete(`/experiences/delete/`).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
