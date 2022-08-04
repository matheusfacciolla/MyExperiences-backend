import { NextFunction, Request, Response } from "express";

export default function handleErrorsMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "Bad_Request") {
    return res.status(400).send(error.message);
  }
  if (error.type === "Unauthorized") {
    return res.status(401).send(error.message);
  }
  if (error.type === "Not_Found") {
    return res.status(404).send(error.message);
  }
  if (error.type === "Conflict") {
    return res.status(409).send(error.message);
  }
  if (error.type === "Unprocessable_Entity") {
    return res.status(422).send(error.message);
  }
  return res.status(500).send("Internal Server Error");
}
