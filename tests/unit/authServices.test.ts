// import { jest } from "@jest/globals";
// import { faker } from "@faker-js/faker";

// import * as authServices from "../../src/services/authService.js";
// import * as authRepository from "../../src/repositories/authRepository.js";

// import { CreateUserData } from "../../src/repositories/authRepository.js";

// jest.mock("../../src/repositories/authRepository.js");

// describe("auth tests suite", () => {
//   it("should signup", async () => {
//     const user: CreateUserData = {
//       email: "teste@gmail.com",
//       password: faker.internet.password(5),
//       name: faker.name.firstName(),
//     };

//     jest
//       .spyOn(authRepository, "findUserByEmail")
//       .mockImplementationOnce((): any => {});

//     await authServices.signUp(user);
//     expect(authRepository.createUser).toBeCalled();
//   });

//   it("should not signup if email already exist", async () => {
//     const user: CreateUserData = {
//       email: "teste@gmail.com",
//       password: faker.internet.password(5),
//       name: faker.name.firstName(),
//     };
//     await authServices.signUp(user);

//     jest
//       .spyOn(authRepository, "findUserByEmail")
//       .mockImplementationOnce((): any => {});

//     await authServices.signUp(user);
//     expect(authRepository.findUserByEmail).rejects.toEqual({
//       type: "Conflict",
//       message: "E-mail already exist",
//     });
//   });

//   it("should signin", async () => {});

//   it("should not signin if email does not exist", async () => {});

//   it("should not signin if password is not correct", async () => {});
// });
