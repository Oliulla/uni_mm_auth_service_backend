import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { UseRoutes } from "./app/modules/user/user.route";
import { AcademicSemesterRoutes } from "./app/modules/academicSemester/academicSemester.route";
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users", UseRoutes);
app.use("/api/v1/academic-semesters", AcademicSemesterRoutes);

// testing
// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('new logger')
// })

// global error handler
app.use(globalErrorHandler);

export default app;
