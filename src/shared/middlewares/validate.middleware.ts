import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

type ValidationTarget = "body" | "params" | "query";

export const validate =
  (schema: z.ZodSchema, target: ValidationTarget) =>
  async (req: Request<{}, {}, {}>, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[target]);
      next();
    } catch (error) {
      next(error);
    }
  };
