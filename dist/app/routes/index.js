"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicSemester_route_1 = require("../module/academicSemester/academicSemester.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/academic-semesters",
        route: academicSemester_route_1.AcademicSemesterRoutes,
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
exports.default = router;
