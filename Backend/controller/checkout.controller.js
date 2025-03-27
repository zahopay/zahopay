import mongoose from "mongoose";
import paymentFormModel from "../model/paymentForm.model.js";
import purchaseModel from "../model/purchase.model.js";
import e from "express";
import userModel from "../model/user.model.js";


export const getCheckoutViewProduct = async(req, res) => {

    try{
        const {id} = req.params;

        const checkoutForm = await paymentFormModel.findById(new mongoose.Types.ObjectId(id))

        if(!checkoutForm){
            return res.status(404).json({success : false, message : "payment form not found"})
        }

        return res.json({success : true, checkoutForm})

    }catch (error) {
        return res.json({success : false, message : error.message})
    }
}

export const submitUserDetails = async(req, res) => {
    try {
        const { name, email, phone, address, productId, price, userId } =
          req.body;


        const newuserDetails = new purchaseModel({
          name,
          email,
          phone,
          address,
          price,
          productId,
          userId,
        });

        await newuserDetails.save();

        return res.json({success : true, newuserDetails})

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const submitPaymentSuccess = async(req, res) => {
    try {
        const { utrNumber, customerId, productId, price, userId } = req.body;

        const customer = await purchaseModel.findById(customerId)

        if(!utrNumber){
            return res.json({success : false, message : "UTR Number Required"})
        }

        const host = req.get("host");
        const protocol = req.protocol;

        const paymentScreenshot = req.file
            ? `${protocol}://${host}/${req.file.path.replace(/\\/g, "/")}`
            : null;
        
        if(!paymentScreenshot){
            return res.json({success : false, message : "Payment Screenshot Is Required"})
        }

        if(customer){
            customer.utrNumber = utrNumber;
            customer.paymentScreenshot = paymentScreenshot;
            customer.paymentStatus = true;

            await customer.save()
        }

        if(!customer){
            const newCustomer = new purchaseModel({
              utrNumber,
              paymentScreenshot,
              price,
              productId,
              userId,
              paymentStatus: true,
            });

            await newCustomer.save()
        }

        return res.json({success : true, message : "Purchase Successfull"})

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const checkUserPaidOrNot = async(req, res) => {
    const {id} = req.params;

    try{

    const paymentForm = await paymentFormModel.findById(id)

    if(!paymentForm){
        return res.json({success : false})
    }

    const user = await userModel.findById(paymentForm.userId)

    if(!user){
        return res.json({usccess : false})
    }

    const userPlan = user?.isUserPlan;

    const userPlanName = user?.userPlan;

    return res.json({success : true , userPlan, userPlanName})

    }catch(error){
        return res.json({ success: false, message: error.message });
    }

} 