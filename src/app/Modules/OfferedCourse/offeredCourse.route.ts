import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();



router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);


router.get('/',  OfferedCourseController.getAllOfferedCourses);


router.get('/:id', OfferedCourseController.getSingleOfferedCourses);


router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourseFromDB);





export const offeredCourseRoutes = router;