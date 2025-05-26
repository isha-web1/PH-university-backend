import config from "../../config";

import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../students/students.interface";
import { TUser } from "./user.interface";
import {generateStudentId} from "./user.utils";
import { User } from "./user.model";
import AppError from "../../errors/appError";
import mongoose from "mongoose";
import httpStatus from 'http-status';


const createStudentIntoDb = async (password : string, payLoad: TStudent) => {

    // create a user object

    const userData : Partial<TUser> = {};
    
    // if password is not given, use default password
    
    userData.password = password || config.default_password;

    // set student role
    userData.role = 'student';


   

     // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );

   if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; //reference _id
    

    // create a student (transaction-2)

    const newStudent = await Student.create([payLoad], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

  
};


export const UserServices = {
    createStudentIntoDb
}