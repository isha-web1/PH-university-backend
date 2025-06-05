
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from '../students/student.validation'
import { createFacultyValidationSchema, } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";




const router = express.Router();

router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);

    // If data is already parsed (object), proceed
    if (req.body && typeof req.body === 'object' && req.body.student) {
      return next();
    }

    // If data is stringified JSON in 'data', parse it
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
        return next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err : any ) {
        console.error("Error parsing JSON:", err.message);
        res.status(400).json({ success: false, message: 'Invalid JSON in data field.' });
        return;

      }
    }

    res.status(400).json({ success: false, message: 'Missing data field' });
  },
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);


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



router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);


router.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe);

export const UserRoutes = router;