import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { AcademicSemesterServices } from "./academicSemester.service";
import { RequestHandler } from "express";





const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});


const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all academic semester are retrieved successfully',
    data: result,
  });
});


export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester
  
};