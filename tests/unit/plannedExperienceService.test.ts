import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { plannedExperienceService } from "../../src/services/plannedExperienceService.js";
import { plannedExperienceRepository, CreatePlannedExperienceData } from "../../src/repositories/plannedExperienceRepository.js";
import { categoriesRepository } from "../../src/repositories/categoriesRepository.js";
import { planned_experiences } from "@prisma/client";

beforeEach(() => {
  jest.resetAllMocks();
});


describe("Post plannedExperience suite", () => {
  it("given valid information, post a plannedExperience", async () => {
    const plannedExperience: CreatePlannedExperienceData = {
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      done: false,
      category_id: 1 || 2 || 3,
    };
    const user_id: number = 1;

    jest
      .spyOn(categoriesRepository, "findCategoryById")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(plannedExperienceRepository, "findPlannedExperienceByTitle")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = plannedExperienceService.postPlannedExperience(
      plannedExperience,
      user_id
    );

    expect(promise).not.toBeNull();
  });

  it("given invalid categoryId, fail to post a plannedExperience", async () => {
    const plannedExperience: CreatePlannedExperienceData = {
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      done: false,
      category_id: 1 || 2 || 3,
    };
    const user_id: number = 1;

    jest
      .spyOn(categoriesRepository, "findCategoryById")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = plannedExperienceService.postPlannedExperience(
      plannedExperience,
      user_id
    );
    expect(categoriesRepository.findCategoryById).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Not_Found",
      message: "Category not found!",
    });
  });

  it("given invalid title that already exist, fail to post a plannedExperience", async () => {
    const plannedExperience: CreatePlannedExperienceData = {
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      done: false,
      category_id: 1 || 2 || 3,
    };
    const user_id: number = 1;

    jest
      .spyOn(categoriesRepository, "findCategoryById")
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(plannedExperienceRepository, "findPlannedExperienceByTitle")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = plannedExperienceService.postPlannedExperience(
      plannedExperience,
      user_id
    );

    expect(promise).rejects.toEqual({
      type: "Conflict",
      message: "This planning is already registered!",
    });
  });
});

describe("Get plannedExperience suite", () => {
  it("given valid userId, get all plannedExperiences", async () => {
    const user_id: number = 1;

    const promise = plannedExperienceService.getAllPlannedExperiences(user_id);
    expect(promise).not.toBeNull();
  });
});

describe("Update plannedExperience suite", () => {
  it("given valid userId and valid information, update plannedExperiences to done", async () => {
    const plannedExperience: planned_experiences = {
      id: 1,
      title: faker.name.jobTitle(),
      place: faker.name.findName(),
      date: "01/01/1998",
      description: faker.name.jobDescriptor(),
      done: false,
      category_id: 1 || 2 || 3,
      user_id: 1,
      created_at: faker.date.past(),
    };
    const user_id: number = 1;

    const promise = plannedExperienceService.updatePlannedExperiences(
      user_id,
      plannedExperience
    );
    expect(promise).not.toBeNull();
  });
});

describe("Delete plannedExperience suite", () => {
  it("given valid information, delete a plannedExperience", async () => {
    const user_id: number = 1;
    const plannedExperience_id: number = 1;

    jest
      .spyOn(plannedExperienceRepository, "findPlannedExperienceById")
      .mockImplementationOnce((): any => {
        return true;
      });

    const promise = plannedExperienceService.deletePlannedExperienceById(
      user_id,
      plannedExperience_id
    );
    expect(plannedExperienceRepository.findPlannedExperienceById).toBeCalled();
    expect(promise).not.toBeNull();
  });

  it("given invalid plannedExperienceId information, fail to delete a plannedExperience", async () => {
    const user_id: number = 1;
    const plannedExperience_id: number = 0;

    jest
      .spyOn(plannedExperienceRepository, "findPlannedExperienceById")
      .mockImplementationOnce((): any => {
        return false;
      });

    const promise = plannedExperienceService.deletePlannedExperienceById(
      user_id,
      plannedExperience_id
    );
    expect(plannedExperienceRepository.findPlannedExperienceById).toBeCalled();
    expect(promise).rejects.toEqual({
      type: "Not_Found",
      message: "Planned Experience not found!",
    });
  });
});
