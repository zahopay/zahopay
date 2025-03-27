import express from "express"
import {
  getCheckoutViewProduct,
  submitUserDetails,
  submitPaymentSuccess,
  checkUserPaidOrNot,
} from "../controller/checkout.controller.js";
import { upload } from "../multer/multer.js";

const checkoutRoute = express.Router();

checkoutRoute.get("/payment/:id", getCheckoutViewProduct);

checkoutRoute.post("/submit-user-details", upload.none() , submitUserDetails);

checkoutRoute.post(
  "/submit-customer-purchase",
  upload.single("paymentScreenshot"),
  submitPaymentSuccess
);

checkoutRoute.get("/user-plan/:id", checkUserPaidOrNot);


export default checkoutRoute;