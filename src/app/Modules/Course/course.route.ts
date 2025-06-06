import express from 'express';

import { CourseValidations } from './course.validation';
import { courseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin),auth(USER_ROLE.faculty, USER_ROLE.student),
  courseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

router.delete('/:id', auth(USER_ROLE.superAdmin, USER_ROLE.admin),  courseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties', auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  courseControllers.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties', auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);

router.get('/',  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ), courseControllers.getAllCourses);

export const CourseRoutes = router;