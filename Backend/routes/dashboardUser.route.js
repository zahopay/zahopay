import express from "express"
import userAuth from "../middleware/userAuth.js"
import {
  getAllUserPaymentForm,
  getUserPaymentFormSoldThisWeek,
  getuserTotalRevenue,
  getUserWeekRevenue,
  getSalesStatistics,
} from "../controller/dashBoardUser.controller.js";

const dashboardUserRoute = express.Router()

dashboardUserRoute.get("/get-user-payment-form-count", userAuth, getAllUserPaymentForm)

dashboardUserRoute.get("/get-user-total-revenue", userAuth, getuserTotalRevenue)

dashboardUserRoute.get("/get-user-week-revenue", userAuth, getUserWeekRevenue)

dashboardUserRoute.get("/get-user-week-form-sold-count", userAuth, getUserPaymentFormSoldThisWeek);

dashboardUserRoute.get("/get-user-statistics", userAuth, getSalesStatistics);




export default dashboardUserRoute