"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterModel = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const AcademicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_constant_1.AcademicSemesterName,
        required: true,
    },
    code: {
        type: String,
        enum: academicSemester_constant_1.AcademicSemesterCode,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: academicSemester_constant_1.Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: academicSemester_constant_1.Months,
        required: true,
    },
}, { timestamps: true });
// isSemesterExists for checking
// AcademicSemesterSchema.pre("save", async function (next) {
//   const isSemesterExists = await academicSemesterModel.findOne({
//     year: this.year,
//     name: this.name,
//   });
//   if (isSemesterExists) {
//     throw new AppError(httpStatus.CONFLICT, "Semester is already exists !");
//   }
//   next();
// });
exports.academicSemesterModel = (0, mongoose_1.model)("AcademicSemester", AcademicSemesterSchema);
