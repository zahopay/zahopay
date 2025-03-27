import express from "express"
import userAuth from "../middleware/userAuth.js"
import { changeUserPassword, userProfile } from "../controller/profile.controller.js"

const dashboardRouter = express.Router()

dashboardRouter.get("/get-user-profile", userAuth, userProfile)
dashboardRouter.post("/user-change-password", userAuth, changeUserPassword);


export default dashboardRouter;

