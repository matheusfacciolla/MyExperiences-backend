import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) {
    throw { type: "Unauthorized", message: "Token not found" };
  }

  const key = process.env.JWT_SECRET;
  const user = jwt.verify(token, key);

  if (!user) {
    throw { type: "Unauthorized", message: "Invalid token" };
  }

  res.locals.user = user;

  next();
}
