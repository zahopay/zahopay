import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyotpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    userPlanExpire: { type: Date, default: null },
    planExpiryNotified: { type: Boolean, default: false },
    userPlan: { 
      type: String, 
      default: "no-plan",
      enum: ["no-plan", "individual-30", "individual-365", "enterprise-30", "enterprise-365"]
    },
    isUserPlan : {type : Boolean, default : false},
    userPlanExpire: { type: Date, default: null },
    planExpiryNotified: { type: Boolean, default: false },
    userEarnings: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    userUPI: { type: String, default: "" },
    userProfile: {
      firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
      address: { type: String, default: "" },
    },
    kycDetails: {
      aadharFront: { type: String, default: null },
      aadharBack: { type: String, default: null },
      panImage: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default userModel;