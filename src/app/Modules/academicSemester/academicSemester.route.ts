import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);


router.get('/',  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ), AcademicSemesterControllers.getAllAcademicSemester)

router.get( '/:id',  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ), AcademicSemesterControllers.getSingleAcademicSemester);


router.patch(
  '/:courseId',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);
 
  
 



export const AcademicSemesterRoutes = router;