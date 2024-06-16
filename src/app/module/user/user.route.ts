import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validationRequest from "../../middleware/validateRequest";
import { studentValidation } from "../student/student.validation";

const router = express.Router();

router.post(
  "/create-student",
  validationRequest(studentValidation.createStudentValidationSchema),
  UserControllers.createStudent
);
router.get("/", UserControllers.getAllUser);

router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
