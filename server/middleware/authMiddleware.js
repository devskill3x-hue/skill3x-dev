// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // { id }

    // 🔥 FETCH USER FROM DB (THIS WAS MISSING)
    const user = await User.findById(decoded.id).select(
      "plan planExpiresAt name email"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ now has plan & expiry
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
