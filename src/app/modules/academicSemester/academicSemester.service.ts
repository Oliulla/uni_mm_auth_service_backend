import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import httpStatus from "http-status";

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);

  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }

  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicSemesterService = {
  createSemester,
  getAllSemesters,
};
