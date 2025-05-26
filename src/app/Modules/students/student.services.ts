import mongoose from "mongoose";
import { Student } from "../student.model";
import AppError from "../../errors/appError";
import httpStatus from 'http-status';
import { User } from "../user/user.model";



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

const getSingleStudentFromDb = async (id: string) => {
//   const result = await Student.findOne({ id });
const result = await Student.findById(id).populate('admissionSemester')
  .populate({
    path : 'academicDepartment',
    populate : {
      path : 'academicFaculty'
    }
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
};
