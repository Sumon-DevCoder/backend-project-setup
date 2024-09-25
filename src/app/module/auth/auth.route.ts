import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userSchemaValidation } from "../user/user.validation";
import { loginUserSchemaValidation } from "./auth.validation";

const router = Router();

// register user
router.post(
  "/register",
  validateRequest(userSchemaValidation.createUserValidationSchema),
  AuthControllers.register,
);

// login user
router.post(
  "/login",
  validateRequest(loginUserSchemaValidation),
  AuthControllers.login,
);

export const AuthRoutes = router;
