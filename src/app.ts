import express, { Request, Response, Application } from "express"
import cors from "cors"
import usersRouter from "./app/modules/users/users.route"
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use("/api/v1/users", usersRouter)

// testing
app.get("/", async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Test route running...",
  })
})

export default app
