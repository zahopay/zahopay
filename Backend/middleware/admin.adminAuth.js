import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.cookies.adminId;

  if (!token)

    return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = { id: decoded.id , token};

    req.body.adminToken = decoded.id;

    next();

  } catch (error) {
    res.clearCookie("adminId", { path: "/" });
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
