import express from "express"
import userAuth from "../middleware/userAuth.js";
import { getAllUserPurchase } from "../controller/purchase.contoller.js";


const purchaseRoute = express.Router()

purchaseRoute.get("/get-all-user-purchase", userAuth, getAllUserPurchase)

export default purchaseRoute;