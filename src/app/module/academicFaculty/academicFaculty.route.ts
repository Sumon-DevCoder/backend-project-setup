import express from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { academicFacultyValidations } from "./academicFaculty.validation";
import validatRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create-academic-faculty",
  //   validatRequest(
  //     academicFacultyValidations.createAcademicFacultyValidationSchema
  //   ),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validatRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty
);

export const AcademicFacultyRoutes = router;
