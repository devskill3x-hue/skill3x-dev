// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // { id: ... }
    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
