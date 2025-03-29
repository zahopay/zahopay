import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {

    const token = req.cookies.admin_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No authentication token found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = { id: decoded.id };
        next();
    } catch (error) {
        console.error("JWT verification failed:", error); // Log the error object
        res.clearCookie("admin_token", {
            domain: ".zahopay.in",
            path: "/",
        });
        return res.status(401).json({
            success: false,
            message: "Invalid or expired session",
        });
    }
};


export default adminAuth;
