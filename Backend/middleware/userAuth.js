import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  
  const token = req.cookies.accessid;

  console.log('Incoming cookies:', req.cookies);
  console.log('Request headers:', req.headers);

  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      message: "Not authorized - no token"
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!tokenDecoded?.id) {
      console.log('Token decoded but missing ID');
      return res.status(401).json({
        success: false,
        isAuthenticated: false,
        message: "Invalid token structure"
      });
    }

    // Verify user exists in database
    const userExists = await userModel.exists({ _id: tokenDecoded.id });
    if (!userExists) {
      console.log('User not found in database');
      return res.status(404).json({
        success: false,
        isAuthenticated: false,
        message: "User not found"
      });
    }

    req.body.userId = tokenDecoded.id;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.clearCookie("accessid", {
      domain: ".zahopay.in",
      path: "/",
    });
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      message: "Session expired"
    });
  }
};

export default userAuth;
