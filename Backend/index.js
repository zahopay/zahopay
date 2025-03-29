import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
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

const app = express();
const port = process.env.PORT || 5040;

const allowedOrigins = [
  'https://zahopay.in',
  'https://api.zahopay.in',
  'https://zahopay.onrender.com',
  'https://zahopay-frontend.onrender.com'
];

// Connect to database first
connectDB();

// Middleware setup
app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: [
    'https://zahopay-frontend.onrender.com',
    'https://zahopay.in',
    'https://zahopay.onrender.com',
    'https://zahopay-frontend.onrender.com'
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 




// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(join(__dirname, 'uploads'))); // Better path handling

// Basic route
app.get("/", (req, res) => {
    res.send("API Working");
});

// API routes
app.use("/api/auth/", authRouter);
app.use("/api/user", userRouter);
app.use("/api/create", paymentFromRoute);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/user", purchaseRoute);
app.use("/api/userplan", userPlanRoute);
app.use("/user/kyc", userKycRoute);
app.use("/home/view", contactusRoute);
app.use("/user/dashboard", dashboardUserRoute);
app.use("/customer/checkout", checkoutRoute);
app.use("/admin/auth", adminDashboardRoute);

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log("Server running in PORT : " + port);
    startPlanExpiryCron();
});
