import { Request, Response } from "express";
import { studentServices } from "./student.services";

const createStudent = async (req: Request, res: Response) => {
 try{

    const {student:studentData} = req.body;
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDb(studentData)
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

const getAllStudent = async (req:Request, res: Response) => {
    try{
        const result = await studentServices.getAllStudentFromDb()

        res.status(200).json({
            success : true,
            message : 'student is retrieve successfully !!',
            data : result
        })

    }catch(err){
        console.log(err)
    }
}



const getSingleStudent = async (req:Request, res: Response) => {
    try{
        const {studentId} = req.params;
        const result = await studentServices.getSingleStudentFromDb(studentId)

        res.status(200).json({
            success : true,
            message : 'student is retrieve successfully !!',
            data : result
        })

    }catch(err){
        console.log(err)
    }
}




export const studentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent
}