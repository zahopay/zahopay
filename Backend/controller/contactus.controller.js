import validator from "validator";
import transporter from "../config/nodemailer.js";

export const submitContactUsForm = async(req,res) => {
    try {
        const {name, email, message} = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
        success: false,
        message: "All fields are required",
        });
    }

    if (!validator.isEmail(email)) {
    return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
    });
    }

    if (message.length < 50) {
        return res.status(400).json({
        success: false,
        message: "Message must be at least 50 characters",
        });
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: "zahopay@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>This message was sent from the contact form on your website.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    const userMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Thank you for contacting us!",
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p>Here's what you sent us:</p>
        <blockquote>${message}</blockquote>
        <hr>
        <p>Best regards,</p>
        <p>The Zahopay Team</p>
      `,
    };

    await transporter.sendMail(userMailOptions);

    res.status(200).json({
        success: true,
        message: "Message sent successfully!",
    });


    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}