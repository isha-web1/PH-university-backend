import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id',  auth(USER_ROLE.superAdmin, USER_ROLE.admin), FacultyControllers.deleteFaculty);

router.get('/',auth(USER_ROLE.admin, USER_ROLE.faculty),FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;