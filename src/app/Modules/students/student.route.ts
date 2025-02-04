
import   express  from "express";
import { studentControllers } from "./student.controllers";

const router = express.Router();


// will call the controller function to create a student
router.post('/create-student', studentControllers.createStudent)

router.get('/', studentControllers.getAllStudent)

router.get('/:studentId', studentControllers.getSingleStudent)


export const studentRoutes = router;