import express from "express"
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import paymentFromRoute from "./routes/paymentform.route.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dashboardRouter from "./routes/dashboad.controller.js";
import adminDashboardRoute from "./routes/admin.dashboard.route.js";
import checkoutRoute from "./routes/checkoutview.route.js";
import purchaseRoute from "./routes/purchase.route.js";
import userPlanRoute from "./routes/userplan.route.js";
import userKycRoute from "./routes/userKyc.route.js";
import dashboardUserRoute from "./routes/dashboardUser.route.js";
import bodyParser from "body-parser";
import contactusRoute from "./routes/contactus.route.js";
import startPlanExpiryCron from "./controller/planExpiryChecker.controller.js";


const app = express()

const port = process.env.PORT || 5040;

const allowedOrigins = [
  'https://zahopay-frontend.onrender.com',
  'https://zahopay.in'
];



connectDB();
app.use(express.json())
app.use(cookieParser())
// Replace all CORS-related code with this single middleware:
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['set-cookie'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.options('*', cors()); 
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static('/mnt/uploads'));




app.get("/", (req, res) => {
    res.send("API Working")
})


app.use("/api/auth/", authRouter);
app.use("/api/user", userRouter);
app.use("/api/create", paymentFromRoute)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/user", purchaseRoute)
app.use("/api/userplan", userPlanRoute)
app.use("/user/kyc", userKycRoute)

//contact us

app.use("/home/view", contactusRoute)

//user dashboard

app.use("/user/dashboard", dashboardUserRoute)

//checkout view

app.use("/customer/checkout", checkoutRoute);

//admin routes

app.use("/admin/auth", adminDashboardRoute);


app.listen(port, () => {
    console.log("Server running in PORT : " + port)
    startPlanExpiryCron()
})


