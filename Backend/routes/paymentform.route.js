import express from "express"
import userAuth from "../middleware/userAuth.js"
import { addNewPaymentForm, allPaymentForm, deleteUserPaymentForm } from "../controller/paymentform.controller.js";
import { upload } from "../multer/multer.js";

const paymentFromRoute = express.Router()

paymentFromRoute.post("/add-payment-form", userAuth, upload.single("logoImage") , addNewPaymentForm)

paymentFromRoute.get("/get-all-payment-form", userAuth, allPaymentForm)

paymentFromRoute.delete("/delete-payment-form/:id", userAuth, deleteUserPaymentForm);

export default paymentFromRoute;