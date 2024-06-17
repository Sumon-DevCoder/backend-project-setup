import { Router } from "express";
import { AcademicSemesterRoutes } from "../module/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../module/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../module/academicDepartment/academicDepartment.route";
import { UserRoutes } from "../module/user/user.route";
import { StudentRoutes } from "../module/student/student.route";
const router = Router();

const moduleRoutes = [
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
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
