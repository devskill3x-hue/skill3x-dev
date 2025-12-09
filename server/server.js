import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); // <-- This must run BEFORE app.listen

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// ===== Routes Imports =====
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"; // ✅ NEW

// ===== Use Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // ✅ NEW

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () =>
  console.log(`🔥 Server running at http://localhost:${PORT}`)
);
