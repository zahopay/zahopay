import userModel from "../model/user.model.js";
import transporter from "./nodemailer.js";

export const sendPlanVerificationEmail = async(userId, plan, transactionId) => {
    try {

        const user = await userModel.findById(userId)

        if (!user) {
          return console.log("User not found");
        }

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "We Received Your Plan Submission ",
          html: `
        <p>Hello, ${user.name} Thank you for choosing Zahopay</p>
        <p>We take 12 to 24 hours to verify your payment and activate your plan. your transactionId : ${transactionId} Plan : ${plan}</p>
        <p>Thank you for using Zahopay!</p>
        <p><strong>The Zahopay Team</strong></p>
        `,
        };

        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        return console.error("Error sending expiry email:", error);
    }
}