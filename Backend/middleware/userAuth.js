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

    console.log("tokenDecoded : ", tokenDecoded)

    console.log("accessid middleware : ", accessid)

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
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
