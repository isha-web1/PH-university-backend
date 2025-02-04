import { StudentModel } from "../student.model";
import { Student } from "./students.interface";


const createStudentIntoDb = async (student : Student) => {

  const result =  await StudentModel.create(student)
  return result;
}


export const studentServices = {
    createStudentIntoDb
}