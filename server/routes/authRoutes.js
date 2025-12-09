import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// 📌 SIGNUP API
router.post("/signup", async (req, res) => {
  try {
    // 1. Updated destructuring to match Frontend (name, mobile)
    const { name, email, mobile, password } = req.body;

    // 2. Updated validation to check for name and mobile
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create user with new fields
    // Note: Ensure your MongoDB User Model (models/user.js) also has 'name' and 'mobile' fields!
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({ 
      message: "User registered successfully",
      user: { id: user._id, name, email, mobile } 
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// 🔐 LOGIN API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name, // 4. Return 'name' consistent with signup
        email: user.email,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;