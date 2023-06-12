import express from "express";
import { UseRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UseRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
