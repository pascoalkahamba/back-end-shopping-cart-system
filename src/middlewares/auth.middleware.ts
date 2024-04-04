import { NextFunction, Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";

import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    // handleError()
    return;
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    // error
    return;
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
    id: number;
  };

  req.id = id;

  next();
}
