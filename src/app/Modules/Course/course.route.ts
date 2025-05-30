import express from 'express';

import { CourseValidations } from './course.validation';
import { courseControllers } from './course.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get(
  '/:id',
  
  courseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  
  validateRequest(CourseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

router.delete('/:id',  courseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);

router.get('/', courseControllers.getAllCourses);

export const CourseRoutes = router;