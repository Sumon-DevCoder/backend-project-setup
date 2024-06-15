import { z } from "zod";
import validator from "validator";

// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: "First name must be 20 or fewer characters" })
    .refine(
      (value) => {
        const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameString === value;
      },
      { message: "First name must be capitalized" }
    ),
  middleName: z.string().max(20).optional(),
  lastName: z
    .string()
    .max(20, { message: "Last name must be 20 or fewer characters" }),
});

// Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

// Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    name: userNameValidationSchema,
    gender: z.enum(["Male", "Female", "Other"], {
      message: "Gender must be Male, Female, or Other",
    }),
    dateOfBirth: z.date({ message: "Date of birth is required" }),
    email: z.string().refine((value) => validator.isEmail(value), {
      message: "Invalid email address",
    }),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImage: z.string(),
    admissionSemester: z.string().min(1), // ObjectId reference to an AcademicSemester document
    academicDepartment: z.string(), // ObjectId reference to an academicDepartment document
    isDeleted: z.boolean().default(false),
    isActive: z.enum(["active", "blocked"], {
      message: "Status must be active or blocked",
    }),
  }),
});

// Zod schema for Student update
const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    name: userNameValidationSchema.partial(),
    gender: z
      .enum(["Male", "Female", "Other"], {
        message: "Gender must be Male, Female, or Other",
      })
      .optional(),
    dateOfBirth: z.date({ message: "Date of birth is required" }).optional(),
    email: z
      .string()
      .refine((value) => validator.isEmail(value), {
        message: "Invalid email address",
      })
      .optional(),
    contactNo: z.string().min(1).optional(),
    emergencyContactNo: z.string().min(1).optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().min(1).optional(),
    permanentAddress: z.string().min(1).optional(),
    guardian: guardianValidationSchema.partial(),
    localGuardian: localGuardianValidationSchema.partial(),
    profileImage: z.string().optional(),
    admissionSemester: z.string().min(1).optional(), // ObjectId reference to an AcademicSemester document
    academicDepartment: z.string().optional(), // ObjectId reference to an academicDepartment document
    isDeleted: z.boolean().default(false).optional(),
    isActive: z
      .enum(["active", "blocked"], {
        message: "Status must be active or blocked",
      })
      .optional(),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
