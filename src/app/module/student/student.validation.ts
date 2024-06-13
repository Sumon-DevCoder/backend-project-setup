import { z } from "zod";

// Helper function to validate capitalized format
const capitalizeValidator = (value: string) => {
  const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
  return firstNameString === value;
};

// UserNameSchema
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20,  { message: "First name should have a maximum length of 20"})
    .trim()
    .refine(value => capitalizeValidator(value), {
      message: "First name must be capitalized",
    }),
  middleName: z.string().max(20).optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: "Last name is not valid",
  }),
});

// GuardianSchema
const GuardianValidationSchema = z.object({
    fatherName: z.string().trim().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

// LocalGuardianSchema
const LocalGuardianValidationSchema = z.object({
  name: z.string().nonempty(),
  occupation: z.string().nonempty(),
  contactNo: z.string().nonempty(),
  address: z.string().nonempty(),
});

// StudentSchema
const createStudentudentValidationSchema = z.object({
  id: z.string().nonempty(),
  user: z.string().nonempty(),
  name: UserNameValidationSchema,
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date(),
  email: z
    .string()
    .email("Invalid email format"),
  contactNo: z.string().nonempty(),
  emergencyContactNo: z.string().nonempty(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  presentAddress: z.string().nonempty(),
  permanentAddress: z.string().nonempty(),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImage: z.string().nonempty(),
  admissionSemester: z.string().nonempty(),
  isDeleted: z.boolean().default(false),
  isActive: z.enum(["active", "blocked"]),
});

 

// Export the schemas
export { createStudentudentValidationSchema };
