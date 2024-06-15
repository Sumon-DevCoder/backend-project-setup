import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema
const AcademicSemesterSchema = new Schema({
  name: { type: String, enum: ["Autumn", "Summer", "Fall"], required: true },
  year: { type: String, required: true },
  code: { type: String, enum: ["01", "02", "03"], required: true },
  startMonth: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  endMonth: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
});

// Define and export Mongoose model
const AcademicSemesterModel = mongoose.model<Document>(
  "AcademicSemester",
  AcademicSemesterSchema
);

export default AcademicSemesterModel;
