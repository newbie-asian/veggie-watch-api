import { config } from "@/config/env.config.js";
import { initDb } from "@/db/db.js";
import { createApp } from "@/createApp.js";

const bootstrap = async () => {
  try {
    await initDb();
    const app = createApp();

    app.listen(config.APP_PORT, () => {
      console.log(`Server is running on port ${config.APP_PORT}`);
    });
  } catch (err) {
    console.error("Error occurred while bootstrapping the application:", err);
    process.exit(1);
  }
};

bootstrap();
