import { Request, Response } from "express";
import { studentServices } from "./student.services";








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
   
    getAllStudent,
    getSingleStudent,
    deleteStudent
}