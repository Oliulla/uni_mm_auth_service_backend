import express from "express";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUser
);

export const UseRoutes = router;
