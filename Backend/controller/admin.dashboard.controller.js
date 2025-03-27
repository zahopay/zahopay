import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "../model/admin.model.js";
import userModel from "../model/user.model.js";
import paymentFormModel from "../model/paymentForm.model.js";
import mongoose from "mongoose";
import purchaseModel from "../model/purchase.model.js";
import planVerificationModel from "../model/planVerification.model.js";
import moment from "moment/moment.js";


export const AdminLogin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  if (!adminEmail || !adminPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const admin = await AdminModel.findOne({ adminEmail });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials", // Don't specify which field is wrong
      });
    }

    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Ensure cookie configuration is correct
    res.cookie("adminId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 8 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || "localhost",
    });

    return res.status(200).json({
      success: true,
      admin: { id: admin._id, email: admin.adminEmail },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const verifyAdmin = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ success: false });
    }

    return res.json({
      success: true,
      admin: { id: req.admin.id, email: req.admin.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("adminId", { path: "/" });
  res.json({ success: true, message: "Logged out" });
};


export const getAllUser = async(req, res) => {
  const { adminToken } = req.body;

  try {
    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const allUsers = await userModel.aggregate([
      {$sort : {createdAt : -1}}
    ])

    return res.json({success : true, allUsers})

  } catch (error) {
    return res.json({success : false, message : error.message})
  }

}

export const getAllPaymentForm = async(req, res) => {
  const { adminToken } = req.body;

  try {
    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const allPaymentForm = await paymentFormModel.aggregate([{ $sort: { createdAt: -1 } }]);

    return res.json({ success: true, allPaymentForm });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

}

export const getAllPurchase = async(req,res) => {
  const { adminToken } = req.body;

  try {
    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const allUsers = await userModel.aggregate([{ $sort: { createdAt: -1 } }]);

    return res.json({ success: true, allUsers });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

}

export const getAllCustomers = async(req, res) => {
  const { adminToken } = req.body;

  try {
    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const allUsers = await userModel.aggregate([{ $sort: { createdAt: -1 } }]);

    return res.json({ success: true, allUsers });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

}

export const getAllIndividualuserProducts = async(req, res) => {

  const { adminToken, userId } = req.body;

  try {
    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const allUserProducts = await paymentFormModel.aggregate([
      { $match: { userId : new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
    ]);

    return res.json({ success: true, allUserProducts });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const fetchAllPurchase = async (req, res) =>{
  try {

    const { adminToken } = req.body;

      if (!adminToken) {
        return res.json({ success: false, message: "Unauthorized" });
      }

      const allPurchase = await purchaseModel.aggregate([
        {$sort : {createdAt : -1}}
      ])

      return res.json({success : true, allPurchase })

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

//fetch all user Plan payment

export const fetchAllUserPlanPayment = async(req, res) => {
  try {
    const {adminToken} = req.body;

    if (!adminToken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const allPlanPayments = await planVerificationModel.aggregate([
      {
        $addFields: {
          userIdObject: { $toObjectId: "$userId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObject",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $sort: { createdAt: -1 } },
    ]);

    return res.json({ success: true, allPlanPayments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

//change user plan status

export const changeUserPlanStatus = async(req, res) => {
  try {
    const { paymentId, status, userId } = req.body;

    // Validate input
    if (!paymentId || !status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request data' 
      });
    }

    // Update payment status
    const updatedPayment = await planVerificationModel.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Payment not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Payment status updated successfully',
      payment: updatedPayment
    });

  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// update user model after successfull plan status change

export const updateUserDetailsAfterPlanStatus = async(req,res) => {
try {
  const { userId, plan, durationDays } = req.body;

  // Validate input
  if (!userId || !plan || !durationDays) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }

  // Calculate expiration date
  const currentDate = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(currentDate.getDate() + parseInt(durationDays));

  // Update user plan
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      userPlan: plan,
      userPlanExpire: expirationDate,
      isUserPlan: true,
      planExpiryNotified: false,
    },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User plan updated successfully",
    user: updatedUser,
  });

} catch (error) {
  console.error("Error updating user plan:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
}

//get user plan history

export const getUserPlanHistory = async(req, res) => {
  const {userId} = req.body;

  try {

    const userPlanHistory = await planVerificationModel.aggregate([
      { $match: { userId: userId , status : "approved"} },
      {$sort : {createdAt : -1}}
    ]);

    return res.json({ success: true, userPlanHistory });


  } catch (error) {
      console.error("Error updating user plan:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
  }
}


//dashboard analytics

export const getAllUserAnalyticsPaymentForm = async (req, res) => {

  try {
    const totalPaymentFormCount = await paymentFormModel.countDocuments();

    return res.json({ success: true, totalPaymentFormCount });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getUserAnalyticsTotalRevenue = async (req, res) => {
  try {


    const result = await purchaseModel.aggregate([
      {
        $match: {
          paymentStatus: true,
        },
      },
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);

    const totalrevenue = result.length > 0 ? result[0].totalRevenue : 0;

    return res.json({ success: true, totalrevenue });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getAnalyticsWeekRevenue = async (req, res) => {
  try {

    const startOfWeek = moment().startOf("isoWeek").toDate();
    const endOfWeek = moment().endOf("isoWeek").toDate();

    const result = await purchaseModel.aggregate([
      {
        $match: {
          paymentStatus: true,
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);

    const totalweekrevenue = result.length > 0 ? result[0].totalRevenue : 0;

    return res.json({ success: true, totalweekrevenue });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getAnalyticsPaymentFormSoldThisWeek = async (req, res) => {
  try {

    const startOfWeek = moment().startOf("isoWeek").toDate();
    const endOfWeek = moment().endOf("isoWeek").toDate();

    const purchaseCountThisWeek = await purchaseModel.countDocuments({
      paymentStatus: true,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });

    return res.json({ success: true, purchaseCountThisWeek });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getAnalyticsSalesStatistics = async (req, res) => {
  try {

    const { filter } = req.query;

    let startDate, endDate;
    const today = moment().startOf("day");

    if (filter === "today") {
      startDate = today;
      endDate = moment().endOf("day");
    } else if (filter === "yesterday") {
      startDate = moment().subtract(1, "day").startOf("day");
      endDate = moment().subtract(1, "day").endOf("day");
    } else if (filter === "7days") {
      startDate = moment().subtract(7, "days").startOf("day");
      endDate = moment().endOf("day");
    } else if (filter === "30days") {
      startDate = moment().subtract(30, "days").startOf("day");
      endDate = moment().endOf("day");
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid filter" });
    }

    const purchases = await purchaseModel
      .find({
        paymentStatus: true,
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .lean();

    const totalRevenue = purchases.reduce(
      (acc, purchase) => acc + purchase.price,
      0
    );
    const totalSales = purchases.length;

    return res.status(200).json({
      success: true,
      totalRevenue,
      totalSales,
      purchases,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};