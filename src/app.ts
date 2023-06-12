import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

import routes from "./app/routes";
import httpStatus from "http-status";
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use("/api/v1/users", UseRoutes);
// app.use("/api/v1/academic-semesters", AcademicSemesterRoutes);
app.use("/api/v1", routes);

// testing
// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('new logger')
// })

// global error handler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Api not found",
      },
    ],
  });

  next();
});

export default app;
