import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidaion } from "./student.validation";
const router = express.Router();

router.get("/:id", StudentController.getAllSingleStudent);
router.delete("/:id", StudentController.deleteSingleStudent);
router.patch(
  "/:id",
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);
router.get("/", StudentController.getAllStudent);

export const StudentRoutes = router;
