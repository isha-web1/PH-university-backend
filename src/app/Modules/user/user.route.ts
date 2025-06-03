import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from '../students/student.validation'
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";




const router = express.Router();

router.post('/create-student' ,auth(USER_ROLE.admin),validateRequest(StudentValidations.createStudentValidationSchema), UserController.createStudent);


router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);


router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);



export const UserRoutes = router;