import validationRequest from "../../middleware/validateRequest";
import express from "express";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validationRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemester);

router.get("/:id", AcademicSemesterControllers.getSingleAcademicSemester);

router.put(
  "/:id",
  validationRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester
);

export const AcademicSemesterRoutes = router;
