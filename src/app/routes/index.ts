import { Router } from "express";
import { UserRoutes } from "../Modules/user/user.route";
import { studentRoutes } from "../Modules/students/student.route";
import { AcademicSemesterRoutes } from "../Modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../Modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../Modules/academicDepartment/academicDepartment.routes";

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
     {
         path: '/academic-faculties',
         route : AcademicFacultyRoutes
     },
     {
        path : '/academic-departments',
        route : AcademicDepartmentRoutes
     }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;