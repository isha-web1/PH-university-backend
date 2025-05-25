import config from "../../config";

import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student.model";
import { TStudent } from "../students/students.interface";
import { TUser } from "./user.interface";
import {generateStudentId} from "./user.utils";
import { User } from "./user.model";


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

  if(!admissionSemester){
      throw new Error('Semester not found')
    }

    // set manually generated id
    userData.id = await generateStudentId(admissionSemester);
    const newUser =  await User.create(userData)

    // create a student
    if(Object.keys(newUser).length){
        // set id , _id as user
        payLoad.id = newUser.id;
        payLoad.user = newUser._id;

        const newStudent = await Student.create(payLoad)
        return newStudent;
    }

  
};


export const UserServices = {
    createStudentIntoDb
}