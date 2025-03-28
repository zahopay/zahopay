import multer from "multer";
import fs from "fs";
import path from "path";

// Base path for uploads (uses Render's persistent disk in production)
const getBaseUploadPath = () => {
  return process.env.NODE_ENV === 'production' 
    ? '/mnt/uploads' 
    : path.join(process.cwd(), 'uploads');
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Processing file:", file.fieldname);
    const basePath = getBaseUploadPath();
    let uploadPath = basePath;

    // Determine subdirectory based on file type
    if (file.fieldname === "logoImage") {
      uploadPath = path.join(basePath, 'paymentform/logo');
    } 
    else if (file.fieldname === "paymentScreenshot") {
      uploadPath = path.join(basePath, 'paymentscreenshot');
    }
    else if (file.fieldname === "aadharFrontImage") {
      uploadPath = path.join(basePath, 'kyc/aadharfront');
    }
    else if (file.fieldname === "aadharBackImage") {
      uploadPath = path.join(basePath, 'kyc/aadharBack');
    }
    else if (file.fieldname === "panImage") {
      uploadPath = path.join(basePath, 'kyc/pan');
    }
    else if (file.fieldname === "planPaymentScreenshot") {
      uploadPath = path.join(basePath, 'plan/screenshot');
    }

    console.log("Final upload path:", uploadPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log("Created directory:", uploadPath);
    }

    cb(null, uploadPath);
  },
// In your multer configuration
filename: (req, file, cb) => {
  const ext = path.extname(file.originalname);

  const cleanName = file.originalname.replace(/^.*[\\\/]/, ''); 
  const filename = `${Date.now()}-${cleanName}`;
  cb(null, filename);
}
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
