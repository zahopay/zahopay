import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  
  const token = req.cookies.accessid;

  console.log("Middle ware token", token)

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Middle ware tokenDecoded", tokenDecoded)

    console.log("Middle ware tokenDecoded ID", tokenDecoded.id)


    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } 
    else {
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
