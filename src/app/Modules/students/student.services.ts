import mongoose from "mongoose";
import { Student } from "../student.model";
import AppError from "../../errors/appError";
import httpStatus from 'http-status';
import { User } from "../user/user.model";
import { TStudent } from "./students.interface";



const getAllStudentFromDb = async () => {
  const result = await Student.find()
  .populate('admissionSemester')
  .populate({
    path : 'academicDepartment',
    populate : {
      path : 'academicFaculty'
    }
  });
  return result;
};

const getSingleStudentFromDb = async (studentId: string) => {
//   const result = await Student.findOne({ id });
const result = await Student.findOne({id : studentId}).populate('admissionSemester')
  .populate({
    path : 'academicDepartment',
    populate : {
      path : 'academicFaculty'
    }
  });
  return result;
};



const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardian: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Isha'
    name.lastName = 'khan'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({id : id}, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDb = async ( studentId : string) => {
   const session = await mongoose.startSession();

  try {
    session.startTransaction();

     // Find student by custom id field
    const student = await Student.findOne({ id: studentId }).session(session);

    if (!student) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student not found');
    }

    // Soft delete
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session }
    );

    // get user _id from deletedStudent
    const userId = student.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err : any ) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error deleting student:", err);
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student');
    
  }
};

export const studentServices = {
  
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentIntoDB
};
