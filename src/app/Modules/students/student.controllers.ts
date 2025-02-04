import { Request, Response } from "express";
import { studentServices } from "./student.services";

const createStudent = async (req: Request, res: Response) => {
 try{

    const student = req.body;
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDb(student)
    // send response
    res.status(200).json({
        success : true,
        message : 'student created successfully !!',
        data : result
    })

 }catch(err){
    console.log(err)
 }
}


export const studentControllers = {
    createStudent
}