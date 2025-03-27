import express from "express"
import {
  login,
  register,
  resetPassword,
  logout,
  sendVerifyOtp,
  verifyAccount,
  isAuthenticted,
  isAuth,
  sendRestOtp,
  changeUserPassword,
} from "../controller/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/change-password", userAuth, changeUserPassword);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyAccount);
authRouter.get("/is-auth", userAuth, isAuth);
authRouter.post("/send-reset-otp", sendRestOtp);
authRouter.post("/reset-password", resetPassword);


export default authRouter;