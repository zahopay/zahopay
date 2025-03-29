import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  
  const { accessid } = req.cookies;

  if (!accessid) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }

  try {
    const tokenDecoded = jwt.verify(accessid, process.env.JWT_SECRET);


    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    res.clearCookie("accessid", {
            domain: ".zahopay.in",
            path: "/",
        });
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
