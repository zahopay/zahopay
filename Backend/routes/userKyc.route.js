import express from "express"
import { upload } from "../multer/multer.js"
import userAuth from "../middleware/userAuth.js"
import { uploadUserKyc } from "../controller/userKyc.controller.js"


const userKycRoute = express.Router()

userKycRoute.post(
  "/upload-user-kyc",
  userAuth,
  upload.fields([
    { name: "aadharFrontImage", maxCount: 1 },
    { name: "aadharBackImage", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
  ]),
  uploadUserKyc
);

export default userKycRoute