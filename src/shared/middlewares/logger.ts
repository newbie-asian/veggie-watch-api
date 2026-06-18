import { pinoHttp } from "pino-http";
import { logger } from "@/shared/utils/logger.js";
import { randomUUID } from "node:crypto";

export const loggerMiddleware = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const existingId = req.id ?? req.headers["x-request-id"];

    if (existingId) return existingId;
    const reqId = randomUUID();
    res.setHeader("X-Request-Id", reqId);

    return reqId;
  },
  customLogLevel: ({}, res, err) => {
    if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 400) {
      return "warn";
    }
    return "info";
  },
  customSuccessMessage: (req, res) => {
    if (res.statusCode === 404) {
      return `Resource not found.`;
    }

    return `${req.method} ${req.url} completed.`;
  },
  customErrorMessage: (req, _res) => {
    return `Error processing ${req.method} ${req.url}`;
  },
});
