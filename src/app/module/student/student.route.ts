import express from "express";
import { StudentControllers } from "./student.controller";
import validatRequest from "../../middleware/validateRequest";
import { studentValidation } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.delete("/:studentId", StudentControllers.deleteSingleStudent);

router.patch(
  "/:studentId",
  validatRequest(studentValidation.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent
);

export const StudentRoutes = router;
