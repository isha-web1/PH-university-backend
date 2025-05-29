import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from '../students/student.validation'
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";




const router = express.Router();

router.post('/create-student',validateRequest(StudentValidations.createStudentValidationSchema), UserController.createStudent);


router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);



export const UserRoutes = router;