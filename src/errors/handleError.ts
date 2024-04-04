import { Request, Response } from "express";

export function handleError(error: BaseError, req: Request, res: Response) {
  return res
    .send({
      message: error.message,
      statusCode: error.statusCode,
    })
    .status(error.statusCode);
}
