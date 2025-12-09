// routes/profileRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/user.js"; // adjust path if needed

const router = express.Router();

/**
 * GET /api/profile
 * Returns: { name, email, mobile }
 */
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email mobile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/profile
 * Body: { name, email, mobile }
 */
router.put("/", protect, async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, mobile },
      { new: true, runValidators: true }
    ).select("name email mobile");

    res.json({
      name: updatedUser.name || "",
      email: updatedUser.email || "",
      mobile: updatedUser.mobile || "",
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
