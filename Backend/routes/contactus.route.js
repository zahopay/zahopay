import express from "express"
import { submitContactUsForm } from "../controller/contactus.controller.js"
import { upload } from "../multer/multer.js"

const contactusRoute = express.Router()

contactusRoute.post("/contact-us", upload.none(), submitContactUsForm)

export default contactusRoute