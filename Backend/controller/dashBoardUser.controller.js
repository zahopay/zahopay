import mongoose from "mongoose";
import paymentFormModel from "../model/paymentForm.model.js";
import purchaseModel from "../model/purchase.model.js";
import moment from "moment/moment.js";


export const getAllUserPaymentForm = async(req, res) => {
    try {
        const {userId} = req.body;

        if(!userId){
            return res.sjon({success : false, message : "Login Again"})
        }

        const totalPaymentFormCount = await paymentFormModel.countDocuments({
            userId : userId
        })

        return res.json({ success: true, totalPaymentFormCount });
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}

export const getuserTotalRevenue = async(req, res) => {
    try {
        const {userId} = req.body;

        if (!userId) {
          return res.sjon({ success: false, message: "Login Again" });
        }

        const result = await purchaseModel.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              paymentStatus: true,
            },
          },
          { $group: { _id: null, totalRevenue : {$sum : "$price"}} },
        ]);

        const totalrevenue = result.length > 0 ? result[0].totalRevenue : 0;

        return res.json({success : true, totalrevenue})

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getUserWeekRevenue = async(req,res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.sjon({ success: false, message: "Login Again" });
      }

      const startOfWeek = moment().startOf("isoWeek").toDate(); 
      const endOfWeek = moment().endOf("isoWeek").toDate(); 

      const result = await purchaseModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
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
}

export const getUserPaymentFormSoldThisWeek = async(req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.sjon({ success: false, message: "Login Again" });
      }

      const startOfWeek = moment().startOf("isoWeek").toDate();
      const endOfWeek = moment().endOf("isoWeek").toDate();

      const purchaseCountThisWeek = await purchaseModel.countDocuments(
        {
            userId: new mongoose.Types.ObjectId(userId),
            paymentStatus: true,
            createdAt: { $gte: startOfWeek, $lte: endOfWeek },
          },
      );

      return res.json({ success: true, purchaseCountThisWeek });

    } catch (error) {

      return res.json({ success: false, message: error.message });
}
}

export const getSalesStatistics = async(req,res) => {
    try {
    const { userId } = req.body;

    if (!userId) {
    return res.sjon({ success: false, message: "Login Again" });
    }

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

     const purchases = await purchaseModel.find({
        userId : userId,
       paymentStatus: true,
       createdAt: { $gte: startDate, $lte: endDate },
     }).lean();

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
}