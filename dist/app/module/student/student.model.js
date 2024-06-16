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
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const UserNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: 20,
        trim: true,
        validate: {
            validator: function (value) {
                const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameString === value;
            },
            message: "{VALUE} is not in capitalize format",
        },
    },
    middleName: { type: String, maxlength: 20 },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
});
const GuardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, trim: true, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});
const LocalGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const StudentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
        unique: true,
    },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        // npm package validation
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email type",
        },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    localGuardian: { type: LocalGuardianSchema, required: true },
    profileImage: { type: String, required: true },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "admission Semester id is required"],
        ref: "AcademicSemester", // reference
        unique: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "academic Department id is required"],
        unique: true,
        ref: "AcademicDepartment", // reference
    },
    isDeleted: { type: Boolean, required: true, default: false },
    isActive: { type: String, enum: ["active", "blocked"], default: "active" },
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true,
});
// virtual
StudentSchema.virtual("fullName").get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// create custom instance method
// StudentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// create custom static method
StudentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
// in delete time existingStudent checking
StudentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const existingStudent = yield exports.Student.findOne(query);
        if (!existingStudent) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Student does not exists!");
        }
        next();
    });
});
exports.Student = (0, mongoose_1.model)("Student", StudentSchema);
