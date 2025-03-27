import multer from "multer";
import fs from "fs";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log("Processing file:", file.fieldname);
    let uploadPath = "uploads/";

    if (file.fieldname === "logoImage") {
      uploadPath = `uploads/paymentform/logo`;
    } 

    if(file.fieldname === "paymentScreenshot"){
      uploadPath = `uploads/paymentscreenshot`
    }

    if(file.fieldname === "aadharFrontImage"){
      uploadPath = `uploads/kyc/aadharfront`
    }

    if (file.fieldname === "aadharBackImage") {
      uploadPath = `uploads/kyc/aadharBack`;
    }

    if (file.fieldname === "panImage") {
      uploadPath = `uploads/kyc/pan`;
    }

    if (file.fieldname === "planPaymentScreenshot") {
      uploadPath = `uploads/plan/screenshot`;
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    console.log("Saving file as:", filename); 
    cb(null, filename);
  },
});



export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});


