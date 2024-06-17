"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicSemester_route_1 = require("../module/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../module/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../module/academicDepartment/academicDepartment.route");
const user_route_1 = require("../module/user/user.route");
const student_route_1 = require("../module/student/student.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/academic-semesters",
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: "/academic-faculties",
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: "/academic-departments",
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/students",
        route: student_route_1.StudentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
