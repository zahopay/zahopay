import express from "express"
import {
  AdminLogin,
  fetchAllPurchase,
  getAllCustomers,
  getAllIndividualuserProducts,
  getAllPaymentForm,
  getAllPurchase,
  getAllUser,
  fetchAllUserPlanPayment,
  changeUserPlanStatus,
  updateUserDetailsAfterPlanStatus,
  verifyAdmin,
  getUserPlanHistory,
  getAllUserAnalyticsPaymentForm,
  getAnalyticsWeekRevenue,
  getUserAnalyticsTotalRevenue,
  getAnalyticsPaymentFormSoldThisWeek,
  getAnalyticsSalesStatistics,
} from "../controller/admin.dashboard.controller.js";
import adminAuth from "../middleware/admin.adminAuth.js"

const adminDashboardRoute = express.Router()

adminDashboardRoute.post("/login", AdminLogin);
adminDashboardRoute.get("/get-all-users",adminAuth,  getAllUser);
adminDashboardRoute.get("/get-all-payment-form", adminAuth,  getAllPaymentForm);
adminDashboardRoute.get("/get-all-customers", adminAuth, getAllCustomers);
adminDashboardRoute.get("/get-all-purchase", adminAuth, getAllPurchase);

//admin auth

adminDashboardRoute.get("/verify", adminAuth, verifyAdmin);


// all user page

adminDashboardRoute.post("/get-user-individual-products", adminAuth, getAllIndividualuserProducts)

//fetch all purchase

adminDashboardRoute.get("/fetch-all-purchase", adminAuth , fetchAllPurchase)

//fetch all user plan payment

adminDashboardRoute.get("/user-plan", adminAuth, fetchAllUserPlanPayment);

// change plan status 

adminDashboardRoute.put("/update-plan-status", adminAuth, changeUserPlanStatus);

//change user model after plan status change

adminDashboardRoute.put("/update-user-plan", adminAuth, updateUserDetailsAfterPlanStatus);

//get user plan history

adminDashboardRoute.post("/user-plan-history", adminAuth, getUserPlanHistory);


adminDashboardRoute.get(
  "/get-user-payment-form-count",
  adminAuth,
  getAllUserAnalyticsPaymentForm
);

adminDashboardRoute.get(
  "/get-user-total-revenue",
  adminAuth,
  getUserAnalyticsTotalRevenue
);

adminDashboardRoute.get(
  "/get-user-week-revenue",
  adminAuth,
  getAnalyticsWeekRevenue
);

adminDashboardRoute.get(
  "/get-user-week-form-sold-count",
  adminAuth,
  getAnalyticsPaymentFormSoldThisWeek
);

adminDashboardRoute.get(
  "/get-user-statistics",
  adminAuth,
  getAnalyticsSalesStatistics
);

export default adminDashboardRoute;
