import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";


const createStudent = async (req: Request, res: Response, next : NextFunction) => {
 try{
    
    const {password,student:studentData} = req.body;
    // data validation using zod
    // const zodParseData = StudentValidationSchema.parse(studentData)
    // will call service function to send this data
    const result = await UserServices.createStudentIntoDb(password,studentData)
    // send response
    res.status(200).json({
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