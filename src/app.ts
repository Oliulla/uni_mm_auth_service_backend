import express, { Application } from "express"
import cors from "cors"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import { UseRoutes } from "./app/modules/users/user.route"
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use("/api/v1/users", UseRoutes)

// testing
// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('new logger')
// })

// global error handler
app.use(globalErrorHandler)

export default app
