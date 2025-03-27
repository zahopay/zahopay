import userModel from "../model/user.model.js";

export const getUserData = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      userDetials: {
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
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
