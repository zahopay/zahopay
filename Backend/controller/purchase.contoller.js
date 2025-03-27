import mongoose from "mongoose";
import purchaseModel from "../model/purchase.model.js";


export const getAllUserPurchase = async(req, res) => {
    try{
    const {userId} = req.body;

    if(!userId){
        return res.json({success : false, message : "Login Again"})
    }

    const allPurchase = await purchaseModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup : {
            from : "paymentforms",
            localField : "productId",
            foreignField : "_id",
            as : "productDetails"
        },
      },
      {$unwind : "$productDetails"},
      { $sort: { createdAt: -1 } },
    ]);

    return res.json({success : true, allPurchase})

}catch(error){
    return res.json({success : false, message : error.message})
}
}