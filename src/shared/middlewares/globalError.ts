import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { AppError } from "@/shared/utils/appError.js";
import { sendError } from "@/shared/utils/apiResponse.js";
import { getDbErrorMessage } from "@/shared/utils/dbErrorHandler.js";
import { z, ZodError } from "zod";

export const globalError: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return sendError({ res, statusCode: err.statusCode, message: err.message });
  }

  if (err instanceof ZodError) {
    const flattened = z.flattenError(err);
    const fieldErrors = flattened.fieldErrors;

    return sendError({
      res,
      statusCode: 400,
      message: "Validation failed for input fields",
      meta: { fields: fieldErrors },
    });
  }

  const dbErrors = getDbErrorMessage(err);
  if (dbErrors) {
    return sendError({
      res,
      statusCode: 400,
      message: dbErrors.message,
      meta: dbErrors.constraint,
    });
  }

  return sendError({ res, statusCode: 500, message: "Internal server error" });
};
