import mongoose from "mongoose";
import paymentFormModel from "../model/paymentForm.model.js";
import paymentModel from "../model/paymentForm.model.js";

export const addNewPaymentForm = async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      phone,
      address,
      storeName,
      price,
      upiId,
      redirectUrl,
      facebookPixel,
      userId,
    } = req.body;

    if (!price || !upiId || !storeName || !title) {
      return res.json({ success: false, message: "Enter all required fields" });
    }

    const host = req.get("host");
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;

    const logoImage = req.file
  ? `${protocol}://${host}/uploads/paymentform/logo/${req.file.filename}`
  : null;

    const userObjectId = new mongoose.Types.ObjectId(userId)

    const newPaymentForm = new paymentModel({
      title,
      price,
      storeName,
      upiId,
      redirectUrl,
      logoImage,
      facebookPixel,
      userId : userObjectId,
      customerForm: {
        name: name === "disable" ? null : name,
        phone: phone === "disable" ? null : phone,
        address: address === "disable" ? null : address,
        email: email === "disable" ? null : email,
      },
    });

    await newPaymentForm.save();

    return res.json({
      success: true,
      message: "Payment form successfully added",
    });
  } catch (error) {
    return res.json({success : false, message : error.message})
  }
};


export const allPaymentForm = async(req, res) => {

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Login Again" });
    }

    const allPaymentForm = await paymentFormModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
    ]);

    return res.json({ success: true, allPaymentForm });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const deleteUserPaymentForm = async(req, res) => {
  try {
    const {userId} = req.body;

    const {id} = req.params;


    if(!userId){
      return res.json({success : false, message : "Login Again"})
    }

    await paymentFormModel.deleteOne(new mongoose.Types.ObjectId(id));

    return res.json({success : true , message : "Payment Form Deleted"})

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

