import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/utils/appError.js";

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new AppError("Resource not found", 404);

  next(error);
};
