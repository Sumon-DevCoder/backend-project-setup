import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";
};
