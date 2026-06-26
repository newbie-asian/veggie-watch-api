import { defineConfig } from "drizzle-kit";
import { envConfig } from "./src/config/envConfig.ts";
import { logger } from "./src/shared/utils/logger.ts";

if (!envConfig?.DATABASE_URL) {
  logger.info("Database url is not defined");
  process.exit(1);
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/shared/db/schema/index.ts",
  casing: "snake_case",
  dbCredentials: {
    url: envConfig.DATABASE_URL,
    ssl: false,
  },
  out: "./src/shared/db/migrations",
});
