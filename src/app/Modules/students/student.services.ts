import { Student } from "../student.model";




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

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
