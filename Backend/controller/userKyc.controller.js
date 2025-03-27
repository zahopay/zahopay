import userModel from "../model/user.model.js";


export const uploadUserKyc = async(req, res) => {

    const {userId} = req.body;

    try {

        if(!userId){
            return res.json({success : false, message : "Login Again"})
        }

        const host = req.get("host");
        const protocol = req.protocol;

        const aadharFrontImage = req.files["aadharFrontImage"]
          ? `${protocol}://${host}/${req.files[
              "aadharFrontImage"
            ][0].path.replace(/\\/g, "/")}`
          : null;


        const aadharBackImage = req.files["aadharBackImage"]
          ? `${protocol}://${host}/${req.files[
              "aadharBackImage"
            ][0].path.replace(/\\/g, "/")}`
          : null;
        const panImage = req.files["panImage"]
          ? `${protocol}://${host}/${req.files["panImage"][0].path.replace(
              /\\/g,
              "/"
            )}`
          : null;


          if(!aadharBackImage || !aadharFrontImage || !panImage){
            return res.json({success : false, message : "Upload All Required KYC Documents"})
          }

          const user = await userModel.findById(userId)

          if(!user){
            return res.json({success : false, message : "Unauthorized"})
          }

          user.kycDetails.aadharFront = aadharFrontImage;
          user.kycDetails.aadharBack = aadharBackImage;
          user.kycDetails.panImage = panImage;

          await user.save()

          return res.json({success : true, message : "KYC Completed"})

    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}