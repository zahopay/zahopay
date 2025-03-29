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

// Corrected CORS middleware (using allowedOrigins)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.header(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, PATCH, DELETE, OPTIONS'
//     );
//   }
//   next();
// });

connectDB();
app.use(express.json())
app.use(cookieParser())
// Replace all CORS-related code with this single middleware:
const corsOptions = {
  origin: [
    'https://zahopay-frontend.onrender.com',
    'https://zahopay.in',
    'http://localhost:3000' 
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
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


