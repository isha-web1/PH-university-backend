import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from '../students/student.validation'




const router = express.Router();

router.post('/create-student',validateRequest(StudentValidations.createStudentValidationSchema), UserController.createStudent);



export const UserRoutes = router;