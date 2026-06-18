import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import {
  correlation,
  loggerMiddleware,
  notFoundMiddleware,
  globalError,
} from "@/shared/middlewares/index.js";
import { registerRoutes } from "@/router.js";

export const createApp = () => {
  const app: Express = express();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(correlation);
  app.use(loggerMiddleware);

  registerRoutes(app);

  app.use(notFoundMiddleware);
  app.use(globalError);

  return app;
};
