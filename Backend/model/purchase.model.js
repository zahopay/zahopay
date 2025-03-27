import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    address: { type: String },
    price: { type: Number, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentforms",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    utrNumber: { type: String },
    paymentScreenshot: { type: String },
    upiId: { type: String },
    paymentStatus : {type : Boolean, default : false}
  },
  { timestamps: true }
);

const purchaseModel = mongoose.models.purchaseModel || mongoose.model("purchaseModel", purchaseSchema);

export default purchaseModel;