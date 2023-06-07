import mongoose from "mongoose"
import config from "./config/index"
import app from "./app"
import { logger, errorLogger } from "./shared/logger"

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connected successfully!`)

    app.listen(config.port, () => {
      logger.info(`Univ Management app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect with DB!!!`)
  }
}

bootstrap()
