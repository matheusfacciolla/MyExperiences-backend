import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
//import bcrypt from "bcrypt";

import { experienceService } from "../../src/services/experienceService.js";
import { experienceRepository } from "../../src/repositories/experienceRepositry.js";
import { categoriesRepository } from "../../src/repositories/categoriesRepository.js";
import { CreateExperienceData } from "../../src/repositories/experienceRepositry.js";

beforeEach(() => {
  jest.resetAllMocks();
});

//jest.mock("../../src/repositories/authRepository.js");

describe("Post experience suite", () => {
  it("given valid information, post a experience", async () => {
    const experience: CreateExperienceData = {
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      category_id: 1 || 2 || 3,
    };
    const user_id: number = 1;

    jest
      .spyOn(categoriesRepository, "findCategoryById")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(experienceRepository, "findExperienceByTitle")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = experienceService.postExperience(experience, user_id);
    // expect(categoriesRepository.findCategoryById).toBeCalled();
    // expect(experienceRepository.findExperienceByTitle).toBeCalled();
    expect(promise).not.toBeNull();
  });

  it("given invalid categoryId, fail to post a experience", async () => {
    const experience: CreateExperienceData = {
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      category_id: 1 || 2 || 3,
    };
    const user_id: number = 1;

    jest
      .spyOn(categoriesRepository, "findCategoryById")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = experienceService.postExperience(experience, user_id);
    expect(categoriesRepository.findCategoryById).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Not_Found",
      message: "Category not found!",
    });
  });

  it("given invalid title that already exist, fail to post a experience", async () => {
    const experience: CreateExperienceData = {
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      category_id: 1 || 2 || 3,
    };
    const user_id: number = 1;

    jest
      .spyOn(categoriesRepository, "findCategoryById")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(experienceRepository, "findExperienceByTitle")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = experienceService.postExperience(experience, user_id);
    // expect(categoriesRepository.findCategoryById).toBeCalled();
    // expect(experienceRepository.findExperienceByTitle).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Conflict",
      message: "This experience is already registered!",
    });
  });
});

describe("Get experience suite", () => {
  it("given valid userId, get all experiences", async () => {
    const user_id: number = 1;

    const promise = experienceService.getAllExperiences(user_id);
    expect(promise).not.toBeNull();
  });
});

describe("Delete experience suite", () => {
  it("given valid information, delete a experience", async () => {
    const user_id: number = 1;
    const experience_id: number = 1;

    jest
      .spyOn(experienceRepository, "findExperienceById")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = experienceService.deleteExperienceById(
      experience_id,
      user_id
    );
    expect(experienceRepository.findExperienceById).toBeCalled();
    expect(promise).not.toBeNull();
  });

  it("given invalid experienceId information, fail to delete a experience", async () => {
    const user_id: number = 1;
    const experience_id: number = 0;

    jest
      .spyOn(experienceRepository, "findExperienceById")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = experienceService.deleteExperienceById(
      experience_id,
      user_id
    );
    expect(experienceRepository.findExperienceById).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Not_Found",
      message: "Experience not found!",
    });
  });
});
