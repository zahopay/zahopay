import userModel from "../model/user.model.js";


export const uploadUserKyc = async(req, res) => {

    const {userId} = req.body;

    try {

        if(!userId){
            return res.json({success : false, message : "Login Again"})
        }

const protocol = req.headers['x-forwarded-proto'] || req.protocol;
const host = req.get('host');


const generateSecureImageUrl = (file) => {
  if (!file) return null;
  
  // Remove any absolute server path and normalize slashes
  const relativePath = file[0].path
    .replace(/^.*[\\\/]uploads[\\\/]/, '') // Remove any leading path up to /uploads
    .replace(/\\/g, '/');
    
  return `https://${host}/uploads/${relativePath}`; // Force HTTPS
};

        const aadharFrontImage = generateSecureImageUrl(req.files['aadharFrontImage']);
        const aadharBackImage = generateSecureImageUrl(req.files['aadharBackImage']);
        const panImage = generateSecureImageUrl(req.files['panImage']);


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
