import type { Express } from "express";
import { logger } from "@/shared/utils/logger.js";
import { centralizeRoutes } from "@/modules/centralizedRoutes.js";
import { envConfig } from "@/config/env.js";

export const registerRoutes = (app: Express) => {
  try {
    for (const route of centralizeRoutes) {
      app.use(`${envConfig.ROUTE_PREFIX}${route.path}`, route.router);
    }
  } catch (error) {
    logger.error("Error registering routes");
  }
};
