import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function schemaValidator(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw {
        type: "Unprocessable_Entity",
        message: error.details.map((detail) => detail.message),
      };
    }

    next();
  };
}
