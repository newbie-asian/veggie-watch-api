import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/utils/appError.js";
import { sendError } from "@/shared/utils/apiResponse.js";
import { getDbErrorMessage } from "@/shared/utils/dbErrorHandler.js";

export const globalError = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return sendError({ res, statusCode: err.statusCode, message: err.message });
  }

  const dbErrors = getDbErrorMessage(err);
};
