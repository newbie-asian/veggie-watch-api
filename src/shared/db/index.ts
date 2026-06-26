import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index.js";
import { envConfig } from "@/config/envConfig.js";
import { logger } from "@/shared/utils/logger.js";

const pool = new Pool({
  host: envConfig.DATABASE_HOST,
  port: envConfig.DATABASE_PORT,
  connectionString: envConfig.DATABASE_URL,
});

pool.on("error", () => {
  logger.error("Error occured while connecting to the database pool.");
});

export const db = drizzle(pool, { schema, casing: "snake_case" });

export const initDb = async () => {
  try {
    await pool.query("SELECT 1");
    logger.info("Database connected successfully");

    await db.execute("select 1");
    logger.info("Drizzle ORM connected successfully");
  } catch (error) {
    logger.error(error, "Error occured while initializing database connection");
    process.exit(1);
  }
};
