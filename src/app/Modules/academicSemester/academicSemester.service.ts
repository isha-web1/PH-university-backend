import AppError from "../../errors/appError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import httpStatus from 'http-status';


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  
      if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};


const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};


const getSingleAcademicSemesterFromDb = async (id: string) => {

const result = await AcademicSemester.findById(id)
  return result;
};



const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};



export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDb,
    getSingleAcademicSemesterFromDb,
    updateAcademicSemesterIntoDB,
  
};