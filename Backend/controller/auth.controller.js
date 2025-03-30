import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import userModel from "../model/user.model.js";
import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {

  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.json({ success: false, message: "User already exist" });
    }

    const existingMobile = await userModel.findOne({ mobile });

    if (existingMobile) {
      return res.json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessid", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ".zahopay.in",
      path: "/",
      partitioned: true 
    });




    //sending mail otp

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome To ZahoPay ",
      text: `Welcome To ZahoPay, Your Account Has been create with email id : ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Account Created" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `catch error : ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credential" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessid", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ".zahopay.in",
      path: "/",
      partitioned: true 
    });


    return res.json({
      success: true,
      message: "Login Successful",
      userDetails: user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessid", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
      domain: ".zahopay.in",
      path: "/",
      partitioned: true 
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Acount Already Verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));


    user.verifyOtp = otp;

    user.verifyotpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "OTP from ZahoPay ",
      text: `Your OTP is ${otp}. Verify your accout using this OTP`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "OTP has been successfully sent",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyAccount = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyotpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;

    (user.verifyOtp = ""), (user.verifyotpExpireAt = 0);

    await user.save();

    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const isAuthenticted = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    return res.json({ success: true, userDetails: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Add this endpoint (fix your isAuthenticated typo)
export const isAuth = async (req, res) => {
  try {
    const token = req.cookies.accessid; 
    
    if (!token) {
      return res.json({ success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');


    if (!user) {
      return res.json({ success: false , message : "Login Again"});
    }

    return res.json({
      success: true,
      userDetails: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAccountVerified: user.isAccountVerified,
        userEarnings: user.userEarnings,
        totalSales: user.totalSales,
        userPlan: user.userPlan,
        createdAt: user.createdAt,
        userId: user._id,
        userPlanExpire: user.userPlanExpire,
      },
    });
  } catch (err) {
    return res.json({ success: false });
  }
};

//reset otp

export const sendRestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: FaLastfmSquare, messgae: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;

    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP from ZahoPay ",
      text: `Your OTP for reset your password is ${otp}. Reset your password using this OTP`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your mail ID" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//reset password

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, Password, OTP are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "No User found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalide OTP" });
    }

    if (user.esetOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;

    user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//change passsword in dashboard

export const changeUserPassword = async (req, res) => {
  const { currentPassword, userId, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return res.json({ success: false, message: "All Fields Reqired" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "Unautorized" });
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!comparePassword) {
      return res.json({
        success: false,
        message: "Current Password not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.save();

    return res.json({ success: true, message: "Password has been changed" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

