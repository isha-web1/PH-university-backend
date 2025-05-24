import { Router } from "express";
import { UserRoutes } from "../Modules/user/user.route";
import { studentRoutes } from "../Modules/students/student.route";
import { AcademicSemesterRoutes } from "../Modules/academicSemester/academicSemester.route";

const router = Router();

const moduleRoutes = [
      {
         path: '/users',
         route: UserRoutes,
      },
      {
         path: '/students',
         route: studentRoutes,
      }, 
      { 
         path : '/academic-semester',
         route: AcademicSemesterRoutes,

      },
      {
         path: '/academic-semesters',
         route: AcademicSemesterRoutes,
     },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;