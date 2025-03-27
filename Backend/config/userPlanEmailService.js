import transporter from "./nodemailer.js";

export const sendPlanExpiryEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your Zahopay Plan Has Expired",
      html: `
        <h2>Dear ${name},</h2>
        <p>Your Zahopay subscription plan has expired.</p>
        <p>To continue enjoying our services, please renew your plan from your dashboard.</p>
        <p>Thank you for using Zahopay!</p>
        <p><strong>The Zahopay Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`Expiry email sent to ${email}`);
    
  } catch (error) {
    console.error("Error sending expiry email:", error);
  }
};