import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { academicSemesterService } from "./academicSemester.service";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { IAcademicSemester } from "./academicSemester.interface";

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester Created successfully",
      data: result,
    });

    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await academicSemesterService.getAllSemesters(
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester retrieved successfully",
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

export const academicSemesterController = {
  createSemester,
  getAllSemesters,
};
