import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  console.log("hitting", req.body);

  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data fetch successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUsersFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Data fetch successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  getAllUser,
  getSingleUser,
};
