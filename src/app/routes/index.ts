import { Router } from "express";
import { UserRoutes } from "../Modules/user/user.route";
import { studentRoutes } from "../Modules/students/student.route";
import { AcademicSemesterRoutes } from "../Modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../Modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../Modules/academicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../Modules/Faculty/faculty.route";
import { AdminRoutes } from "../Modules/Admin/admin.route";
import { CourseRoutes } from "../Modules/Course/course.route";
import { semesterRegistrationRoutes } from "../Modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../Modules/OfferedCourse/offeredCourse.route";
import { AuthRoutes } from "../Modules/Auth/auth.route";
import { EnrolledCourseRoutes } from "../Modules/EnrolledCourse/enrolledCourse.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: semesterRegistrationRoutes,
  },
  {
    path: "/offered-courses",
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
