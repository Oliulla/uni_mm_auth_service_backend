import httpStatus from "http-status";
import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { IStudent } from "./student.interface";
import { StudentService } from "./student.service";
import { studentFilterableFields } from "./student.constant";

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudent(filters, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getAllSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.getAllSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

// const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await StudentService.deleteSingleStudent(id);

//   sendResponse<IStudent>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Student deleted successfully",
//     data: result,
//   });
// });

export const StudentController = {
  getAllStudent,
  getAllSingleStudent,
  updateStudent,
  // deleteSingleStudent,
};
