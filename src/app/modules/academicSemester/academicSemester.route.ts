import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";
import { AcademicSemesterController } from "./academicSemester.controller";
const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get("/:id", AcademicSemesterController.getSingleSemester);

router.patch(
  "/:id",
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.delete("/:id", AcademicSemesterController.deleteSemester);

router.get("/", AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
