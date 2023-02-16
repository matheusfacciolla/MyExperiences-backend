import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { authService } from "../../src/services/authService.js";
import { authRepository, CreateUserData } from "../../src/repositories/authRepository.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Sign up suite", () => {
  it("given valid email, name and password information, sign up", async () => {
    const user: CreateUserData = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => { });

    jest.spyOn(authRepository, "createUser").mockImplementationOnce((): any => { });

    await authService.signUp(user);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(authRepository.createUser).toBeCalled();
  });

  it("given email information that already exists, fail to sign up", async () => {
    const user: CreateUserData = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = authService.signUp(user);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Conflict",
      message: "E-mail already exist",
    });
  });
});

describe("Sign in suite", () => {
  it("given valid email and password information, sign in", async () => {
    const user: CreateUserData = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => true);

    const promise = authService.signIn(user);
    const promise2 = authService.findUserByEmail(user);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(promise).not.toBeNull();
    expect(promise2).not.toBeNull();
  });

  it("given invalid email information, fail to sign in", async () => {
    const user: CreateUserData = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = authService.signIn(user);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Not_Found",
      message: "E-mail not register",
    });
  });

  it("given invalid password information, fail to sign in", async () => {
    const user: CreateUserData = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => false);

    const promise = authService.signIn(user);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Unauthorized",
      message: "Wrong password",
    });
  });
});
