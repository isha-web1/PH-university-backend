import {  RequestHandler,} from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createStudent : RequestHandler = async (req, res, next ) => {
 try{
    
    const {password,student:studentData} = req.body;
    // data validation using zod
    // const zodParseData = StudentValidationSchema.parse(studentData)
    // will call service function to send this data
    const result = await UserServices.createStudentIntoDb(password,studentData)
    // send response
   sendResponse(res,{
    statusCode : httpStatus.OK,
    success : true,
    message : 'student created successfully !!',
    data : result    
   })

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 }catch(err ){
    next(err)
}
}


export const UserController = {
    createStudent
}