import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token =
    req.cookies.admin_token || req.headers.authorization?.split(" ")[1];

  if (!token)

    return res.status(401).json({ success: false, message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.admin = { id: decoded.id , token};

    req.body.adminToken = decoded.id;

    next();

  } catch (error) {
    res.clearCookie("admin_token", { path: "/" , '.onrender.com'});
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
