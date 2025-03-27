import { sendPlanVerificationEmail } from "../config/sendPlanVerificationEmail.js";
import planVerificationModel from "../model/planVerification.model.js";
import userModel from "../model/user.model.js";

export const getUserKycDetails = async(req, res) => {
    const {userId} = req.body;

    try {
        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success : false, message : "Login Again"})
        }

        const kycDetails = {
            aadharFront: user.kycDetails.aadharFront,
            aadharBack: user.kycDetails.aadharBack,
            panImage: user.kycDetails.panImage,
        };

        return res.json({ success: true, kycDetails });

    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

export const handleUserPlanSumbit = async(req, res) => {
    try {
        const { userId, transactionId , plan} = req.body;

        if(!userId){
            return res.json({success : false, message : "Login Again"})
        }

        if(!transactionId){
            return res.json({success : false, message : "Transaction ID required"})
        }

        const host = req.get("host");
        const protocol = req.protocol;

        const paymentScreenshot = req.file
          ? `${protocol}://${host}/${req.file.path.replace(/\\/g, "/")}`
          : null;


        if(!paymentScreenshot){
            return res.json({success : false, message : "Payment Screenshot is required"})
        }


        const paymentVerification = new planVerificationModel({
          userId,
          transactionId,
          plan,
          screenshotPath: paymentScreenshot,
          status : "pending"
        });

        await paymentVerification.save();

        await sendPlanVerificationEmail(userId, plan, transactionId)

        res.status(200).json({
            success: true,
            message: "Payment verification submitted successfully",
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}