"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string()
            .min(6, "Password must have 6 characters")
            .max(20, "Password can not be more than 20 characters"),
        needsPasswordChange: zod_1.z.boolean().optional().default(true),
        role: zod_1.z.enum(["admin", "student", "faculty"]),
        status: zod_1.z.enum(["in-progress", "blocked"]),
        isDeleted: zod_1.z.boolean(),
    }),
});
const updateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string()
            .min(6, "Password must have 6 characters")
            .max(20, "Password cannot be more than 20 characters")
            .optional(),
        needsPasswordChange: zod_1.z.boolean().optional(),
        role: zod_1.z.enum(["admin", "student", "faculty"]).optional(),
        status: zod_1.z.enum(["in-progress", "blocked"]).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.userValidationSchema = {
    createUserValidationSchema,
    updateValidationSchema,
};
