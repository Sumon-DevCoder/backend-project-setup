import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import httpStatus from "http-status";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";
import AppError from "../../error/AppError";

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  { timestamps: true }
);

// isSemesterExists for checking
AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.CONFLICT, "Semester is already exists !");
  }
  next();
});

// isSemesterId is Exist for checking
AcademicSemesterSchema.pre("findOne", async function (next) {
  const query = this.getQuery();

  const isSemesterIdExists = await AcademicSemester.find(query);

  if (isSemesterIdExists.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester does not exists!");
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
