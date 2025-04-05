import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

const userAuth = async (req, res, next) => {
  
  
  const token = req.cookies.accessid;
  
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ 
      success: false,
      isAuthenticated: false,
      message: "Missing authentication token" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    // Verify user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        isAuthenticated: false,
        message: "User not found"
      });
    }

    req.body.userId = decoded.id
    
    next();
    
  } catch (error) {
    console.error('Token verification failed:', error.message);
    
    res.clearCookie("accessid", {
     domain: ".zahopay.site",
      path: "/",
    });
    
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      message: error.message.includes('jwt expired') 
        ? "Session expired" 
        : "Invalid token"
    });
  }
};

export default userAuth;
