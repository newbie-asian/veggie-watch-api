import { envConfig } from "@/config/env.js";
import { initDb } from "@/shared/db/index.js";
import { createApp } from "@/createApp.js";
import { logger } from "./shared/utils/logger.js";

const bootstrap = async () => {
  try {
    await initDb();
    const app = createApp();

    app.listen(envConfig.APP_PORT, () => {
      logger.info(`Server is running on port ${envConfig.APP_PORT}`);
    });
  } catch (err) {
    logger.error(err, "Error occured while bootstrapping the application");
    process.exit(1);
  }
};

bootstrap();
