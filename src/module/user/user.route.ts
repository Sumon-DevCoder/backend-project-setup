import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userSchemaValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
import { USER_Role } from "./user.constant";
import { auth } from "../../middlewares/auth";

const router = Router();

// create admin
router.post(
  "/create-admin",
  validateRequest(userSchemaValidation.createUserValidationSchema),
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  UserControllers.createAdmin
);

// get all admin
router.get(
  "/",
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);

// update user
router.put(
  "/:userId",
  validateRequest(userSchemaValidation.updateUserValidationSchema),
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  UserControllers.updateUser
);

// update only user own profile
router.put(
  "/me",
  validateRequest(userSchemaValidation.updateUserValidationSchema),
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.USER),
  UserControllers.updateUser
);

export const UserRoutes = router;
