import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema, authVerifySchema } from "../schemas/authSchemas.js";
import { subscriptionSchema } from "../schemas/subscriptionSchema.js";
import authController from "../controllers/authController.js";
import authenticate from "../midleware/authenticate.js";
import upload from "../midleware/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(authSchema),
  authController.registerController
);

authRouter.get("/verify/:verificationToken", authController.verifyUserEmail);

authRouter.post(
  "/verify",
  validateBody(authVerifySchema),
  authController.resendVerificationEmail
);

authRouter.post(
  "/login",
  validateBody(authSchema),
  authController.loginController
);

authRouter.get("/current", authenticate, authController.getCurrentController);

authRouter.post("/logout", authenticate, authController.logoutController);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  authController.subscriptionController
);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.avatarsController
);
export default authRouter;
