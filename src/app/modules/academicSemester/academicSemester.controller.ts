import { RequestHandler } from "express";
import { academicSemesterService } from "./academicSemester.service";

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: "Academic semester Created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemesterController = {
  createSemester,
};
