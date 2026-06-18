import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export const correlation = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.headers["x-request-id"] = randomUUID();
  next();
};
