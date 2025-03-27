import mongoose from "mongoose";

const paymentformSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logoImage: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref : "Users", required : true },
  price: { type: Number, required: true },
  facebookPixel: { type: Number},
  storeName: { type: String, required: true },
  customerForm: {
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
  },
  upiId: { type: String, required: true },
  upiDisplay: { type: String, default: "" },
  redirectUrl: { type: String },
}, {timestamps : true});

const paymentFormModel = mongoose.models.paymentForm || mongoose.model("paymentForm", paymentformSchema)

export default paymentFormModel;