import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStuedentId } from "./user.utils";
import { Student } from "../student/student.model";
import httpStatus from "http-status";
// import { generateFacultyId } from "./user.utils";

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // auto increamental id

  // const id = await generateFacultyId();
  // user.id = id;

  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = "student";

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStuedentId(academicSemester);
    user.id = id;

    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!createStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // set student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
