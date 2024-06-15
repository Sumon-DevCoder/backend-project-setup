import express from "express";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validatRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validatRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemester);

router.get("/:id", AcademicSemesterControllers.getSingleAcademicSemester);

router.put(
  "/:id",
  validatRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester
);

export const AcademicSemesterRoutes = router;
