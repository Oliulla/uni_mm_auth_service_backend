import express from "express";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/create-student",
  validateRequest(userValidation.createUserZodSchema),
  UserController.createStudent
);

export const UseRoutes = router;
