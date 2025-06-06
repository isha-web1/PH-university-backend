
import   express  from "express";
import { studentControllers } from "./student.controllers";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router();


// will call the controller function to create a student


router.get('/', auth(USER_ROLE.superAdmin, USER_ROLE.admin), studentControllers.getAllStudent)

router.get('/:studentId',auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty), studentControllers.getSingleStudent)

router.patch('/:id',auth(USER_ROLE.superAdmin, USER_ROLE.admin),validateRequest(updateStudentValidationSchema), studentControllers.updateStudent,);
  
  
  


router.delete('/:studentId', auth(USER_ROLE.superAdmin, USER_ROLE.admin), studentControllers.deleteStudent)


export const studentRoutes = router;