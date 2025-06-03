
import   express  from "express";
import { studentControllers } from "./student.controllers";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router();


// will call the controller function to create a student


router.get('/', studentControllers.getAllStudent)

router.get('/:studentId',auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty), studentControllers.getSingleStudent)

router.patch('/:id',validateRequest(updateStudentValidationSchema), studentControllers.updateStudent,);
  
  
  


router.delete('/:studentId', studentControllers.deleteStudent)


export const studentRoutes = router;