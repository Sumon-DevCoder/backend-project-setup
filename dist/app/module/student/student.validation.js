"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidation = void 0;
const zod_1 = require("zod");
const validator_1 = __importDefault(require("validator"));
// Zod schema for UserName
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, { message: "First name must be 20 or fewer characters" })
        .refine((value) => {
        const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameString === value;
    }, { message: "First name must be capitalized" }),
    middleName: zod_1.z.string().max(20).optional(),
    lastName: zod_1.z
        .string()
        .max(20, { message: "Last name must be 20 or fewer characters" }),
});
// Zod schema for Guardian
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1),
    fatherOccupation: zod_1.z.string().min(1),
    fatherContactNo: zod_1.z.string().min(1),
    motherName: zod_1.z.string().min(1),
    motherOccupation: zod_1.z.string().min(1),
    motherContactNo: zod_1.z.string().min(1),
});
// Zod schema for LocalGuardian
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    occupation: zod_1.z.string().min(1),
    contactNo: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
});
// Zod schema for Student
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        student: zod_1.z.object({
            name: userNameValidationSchema,
            gender: zod_1.z.enum(["Male", "Female", "Other"], {
                message: "Gender must be Male, Female, or Other",
            }),
            dateOfBirth: zod_1.z
                .string()
                .datetime({ message: "Date of birth is required" }),
            email: zod_1.z.string().refine((value) => validator_1.default.isEmail(value), {
                message: "Invalid email address",
            }),
            contactNo: zod_1.z.string().min(1),
            emergencyContactNo: zod_1.z.string().min(1),
            bloodGroup: zod_1.z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            presentAddress: zod_1.z.string().min(1),
            permanentAddress: zod_1.z.string().min(1),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImage: zod_1.z.string(),
            admissionSemester: zod_1.z.string().min(1), // ObjectId reference to an AcademicSemester document
            academicDepartment: zod_1.z.string(), // ObjectId reference to an academicDepartment document
            isDeleted: zod_1.z.boolean().default(false),
            isActive: zod_1.z.enum(["active", "blocked"], {
                message: "Status must be active or blocked",
            }),
        }),
    }),
});
// Zod schema for Student update
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        name: userNameValidationSchema.partial(),
        gender: zod_1.z
            .enum(["Male", "Female", "Other"], {
            message: "Gender must be Male, Female, or Other",
        })
            .optional(),
        dateOfBirth: zod_1.z.date({ message: "Date of birth is required" }).optional(),
        email: zod_1.z
            .string()
            .refine((value) => validator_1.default.isEmail(value), {
            message: "Invalid email address",
        })
            .optional(),
        contactNo: zod_1.z.string().min(1).optional(),
        emergencyContactNo: zod_1.z.string().min(1).optional(),
        bloodGroup: zod_1.z
            .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
            .optional(),
        presentAddress: zod_1.z.string().min(1).optional(),
        permanentAddress: zod_1.z.string().min(1).optional(),
        guardian: guardianValidationSchema.partial(),
        localGuardian: localGuardianValidationSchema.partial(),
        profileImage: zod_1.z.string().optional(),
        admissionSemester: zod_1.z.string().min(1).optional(), // ObjectId reference to an AcademicSemester document
        academicDepartment: zod_1.z.string().optional(), // ObjectId reference to an academicDepartment document
        isDeleted: zod_1.z.boolean().default(false).optional(),
        isActive: zod_1.z
            .enum(["active", "blocked"], {
            message: "Status must be active or blocked",
        })
            .optional(),
    }),
});
exports.studentValidation = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
