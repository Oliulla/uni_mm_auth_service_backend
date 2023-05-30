import mongoose from "mongoose"
import config from "./config/index"
import app from "./app"

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string | number)
    console.log(`Database connected successfully!`)

    app.listen(config.port, () => {
      console.log(`Univ Management app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Failed to connect with DB!!!`)
  }
}

bootstrap(d)
