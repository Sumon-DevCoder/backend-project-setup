import express from "express";
import { academicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import validatRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create-academic-department",
  validatRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  "/:departmentId",
  validatRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
