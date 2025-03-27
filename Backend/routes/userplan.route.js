import express from "express"
import userAuth from "../middleware/userAuth.js";
import { getUserKycDetails, handleUserPlanSumbit,  } from "../controller/userplan.controller.js";
import { upload } from "../multer/multer.js";

const userPlanRoute = express.Router()

userPlanRoute.get("/get-user-kyc-details", userAuth, getUserKycDetails)

userPlanRoute.post(
  "/submit-plan",
  userAuth,
  upload.single("planPaymentScreenshot"),
  handleUserPlanSumbit
);


export default userPlanRoute;