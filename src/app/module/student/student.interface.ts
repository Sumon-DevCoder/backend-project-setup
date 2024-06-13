import { Types } from "mongoose";

export interface TUserName {
  firstName: string;
  middleName?: string; // optional
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface TStudent {
  id: string;
  user: Types.ObjectId; // ObjectId reference to a User document
  name: TUserName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  admissionSemester: Types.ObjectId; // ObjectId reference to an AcademicSemester document
  isDeleted: boolean;
  isActive: "active" | "blocked";
}
