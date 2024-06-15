import { Router } from "express";
import { AcademicSemesterRoutes } from "../module/academicSemester/academicSemester.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  //   {
  //     path: "/users",
  //     route: UserRoutes,
  //   },
  //   {
  //     path: "/students",
  //     route: StudentRoutes,
  //   },

  //   {
  //     path: "/academic-faculties",
  //     route: AcademicFacultyRoutes,
  //   },
  //   {
  //     path: "/academic-departments",
  //     route: AcademicDepartmentRoutes,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
