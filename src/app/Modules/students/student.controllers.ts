import { RequestHandler } from "express";
import { studentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});







const getSingleStudent = catchAsync(async (req, res) => {
  const {  studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});



const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
 const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(id,student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});



const deleteStudent = catchAsync(async (req, res) => {
  const { studentId} = req.params;
  const result = await studentServices.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});


export const studentControllers = {
   
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent,
}