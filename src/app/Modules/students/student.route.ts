
import   express  from "express";
import { studentControllers } from "./student.controllers";

const router = express.Router();


// will call the controller function to create a student
router.post('/create-student', studentControllers.createStudent)