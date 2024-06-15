import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, "Password must have 6 characters")
      .max(20, "Password can not be more than 20 characters"),
    needsPasswordChange: z.boolean().optional().default(true),
    role: z.enum(["admin", "student", "faculty"]),
    status: z.enum(["in-progress", "blocked"]),
    isDeleted: z.boolean(),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, "Password must have 6 characters")
      .max(20, "Password cannot be more than 20 characters")
      .optional(),
    needsPasswordChange: z.boolean().optional(),
    role: z.enum(["admin", "student", "faculty"]).optional(),
    status: z.enum(["in-progress", "blocked"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  updateValidationSchema,
};
