import { z } from "zod";

process.loadEnvFile();

const ENVSCHEMA = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_PORT: z.coerce.number().default(3000),
  ROUTE_PREFIX: z.string().default("/api/v1"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_HOST: z
    .string()
    .min(1, "DATABASE_HOST must be explicitly set in your .env file")
    .default("localhost"),
  DATABASE_NAME: z
    .string()
    .min(1, "DATABASE_NAME must be explicitly set in your .env file")
    .default("veggie_watch"),
  DATABASE_USERNAME: z
    .string()
    .min(1, "DATABASE_USERNAME must be explicitly set in your .env file"),
  DATABASE_PASSWORD: z
    .string()
    .min(1, "DATABASE_PASSWORD must be explicitly set in your .env file"),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL must be explicitly set in your .env file"),
});

const parsedEnv = ENVSCHEMA.safeParse(process.env);
if (!parsedEnv.success) {
  process.exit(1);
}

export const envConfig = parsedEnv.data;
