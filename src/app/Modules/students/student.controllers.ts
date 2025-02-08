import { Request, Response } from "express";
import { studentServices } from "./student.services";
import StudentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
 try{
    
    const {student:studentData} = req.body;
    // data validation using zod
    const zodParseData = StudentValidationSchema.parse(studentData)
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDb(zodParseData)
    // send response
    res.status(200).json({
        success : true,
        message : 'student created successfully !!',
        data : result
    })

 }catch(err : any){
    res.status(500).json({
        success : false,
        message : err.message || 'student not create !!',
        data : err
 })
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
        res.status(500).json({
            success : false,
            message : 'some thing went wrong!!',
            data : err
     })
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
        res.status(500).json({
            success : false,
            message : 'some thing went wrong!!',
            data : err
     })
    }
}

const deleteStudent = async (req: Request, res: Response) => {
    try{
       
       const {studentId} = req.params;
       
       const result = await studentServices.deleteStudentFromDb(studentId)
       // send response
       res.status(200).json({
           success : true,
           message : 'student deleted successfully !!',
           data : result
       })
   
    }catch(err){
       res.status(500).json({
           success : false,
           message : 'some thing went wrong!!',
           data : err
    })
   }
   }


export const studentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent
}