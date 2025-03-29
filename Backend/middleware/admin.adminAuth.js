import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "No authentication token found" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Remove role check since your JWT doesn't include it
    req.admin = { id: decoded.id };
    next();
    
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.clearCookie("admin_token", {
      domain: 'zahopay.in',
      path: '/'
    });
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired session"
    });
  }
};

export default adminAuth;
