import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { logger } from "../utils/logger.js";

type ValidationTarget = "body" | "params" | "query";

export const validate =
  (schema: z.ZodSchema, target: ValidationTarget) =>
  async (req: Request<{}, {}, {}>, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[target]);
      next();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
