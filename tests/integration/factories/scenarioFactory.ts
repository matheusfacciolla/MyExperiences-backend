import * as authFactory from "../../integration/factories/appFactory.js";
import * as authService from "../../../src/services/authService.js";
import * as experienceService from "../../../src/services/experienceService.js";

export async function scenarioUserLogged() {
  const login = authFactory.createSignUp();
  await authFactory.createUser(login);
  delete login.name;

  const token = await authService.signIn(login);
  return token;
}

export async function scenarioExperienceCreated() {
  const login = authFactory.createSignUp();
  await authFactory.createUser(login);
  delete login.name;

  const token = await authService.signIn(login);
  const user_id = await authService.findUserByEmail(login);
  const input = authFactory.createExperienceInput();

  const res = await experienceService.postExperience(input, user_id.id);
  return { token, res };
}

export async function scenarioPlannedExperienceCreated() {
  const login = authFactory.createSignUp();
  await authFactory.createUser(login);
  delete login.name;

  const token = await authService.signIn(login);
  const user_id = await authService.findUserByEmail(login);
  const input = authFactory.createPlannedExperienceInput();

  const res = await experienceService.postExperience(input, user_id.id);
  return { token, res, user_id: user_id.id };
}
