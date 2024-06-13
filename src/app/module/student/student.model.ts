import mongoose, { Schema, Document } from "mongoose";

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

import validator from "validator";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: 20,
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameString === value;
      },
      message: "{VALUE} is not in capitalize format",
    },
  },
  middleName: { type: String, maxlength: 20 },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, trim: true, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
      unique: true,
    },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      // npm package validation
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not valid email type",
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    localGuardian: { type: LocalGuardianSchema, required: true },
    profileImage: { type: String, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "admission Semester id is required"],
      ref: "AcademicSemester",
      unique: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
    isActive: { type: String, enum: ["active", "blocked"], required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// virtual
StudentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
