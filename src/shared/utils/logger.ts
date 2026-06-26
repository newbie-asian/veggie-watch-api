import pino from "pino";
import { envConfig } from "@/config/envConfig.js";

export const logger = pino({
  level: envConfig.LOG_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss",
    },
  },
});
