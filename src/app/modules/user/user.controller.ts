import httpStatus from "http-status";
import { RequestHandler } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully",
    data: result,
  });

  next();
});

export const UserController = {
  createUser,
};
