"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_utils_1 = require("./user.utils");
const createStudentDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    // if password not given use default password
    userData.password = password || config_1.default.default_password;
    // set student role
    userData.role = "student";
    // find academic semester info
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError_1.default(404, "admissionSemester not found");
    }
    // set mannually generate id
    userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
    // session
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create a user (transction - 1)
        const newUser = yield user_model_1.User.create([userData], { session });
        // create a student
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        else {
            payload.id = newUser[0].id; // embedded id
            payload.user = newUser[0]._id; // reference id
        }
        // create a student (transction - 2)
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create student");
        }
        yield session.commitTransaction(); // for save database permanently
        yield session.endSession(); // end session
        return newStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUsersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
exports.UserServices = {
    createStudentDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
};
