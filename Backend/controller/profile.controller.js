import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const userProfile = async(req,res) => {

    try {
      const { userId } = req.body;

      if (!userId) {
        return res.json({ success: false, message: "Login Again" });
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return res.json({ success: false, message: "Unauthorized" });
      }

      return res.json({ success: true, user });
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

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

    await user.save();

    return res.json({ success: true, message: "Password has been changed" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
