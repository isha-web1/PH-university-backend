import config from "../../config";
import { Student } from "../student.model";
import { TStudent } from "../students/students.interface";
import { TUser } from "./user.interface";

import { User } from "./user.model";


const createStudentIntoDb = async (password : string, studentData: TStudent) => {

    // create a user object

    const userData : Partial<TUser> = {};
    
    // if password is not given, use default password
    
    userData.password = password || config.default_password;

    // set student role
    userData.role = 'student';
    // set manually generated id
    userData.id = '2030100001';
    const newUser =  await User.create(userData)

    // create a student
    if(Object.keys(newUser).length){
        // set id , _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await Student.create(studentData)
        return newStudent;
    }

  
};


export const UserServices = {
    createStudentIntoDb
}