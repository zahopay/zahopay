import mongoose from "mongoose";

const planVerficationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    transactionId: { type: String, required: true },
    plan: { type: String, required: true },
    screenshotPath: { type: String, required: true },
    status : {type : String, default : "pending"}
  },
  { timestamps: true }
);

const planVerificationModel = mongoose.models.planVerification || mongoose.model("planVerification", planVerficationSchema);

export default planVerificationModel

