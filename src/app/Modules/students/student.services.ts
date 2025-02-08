import { Student } from "../student.model";
import { TStudent } from "./students.interface";

const createStudentIntoDb = async (studentData: TStudent) => {
    if(await  Student.isUserExists(studentData.id)){
        throw new Error('user already exist')
       }
    const result =  await Student.create(studentData)

  
  //   return result;

//   const student = new Student(studentData);
//   if(await student.isUserExists(studentData.id)){
//     throw new Error('user already exist')
//   }
//   const result = await student.save();
  return result;
};

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
//   const result = await Student.findOne({ id });
const result = await Student.aggregate([{$match : {id : id}}])
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
