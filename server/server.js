// ✅ LOAD ENV FIRST — BEFORE ANY OTHER IMPORTS
import "./config/env.js";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () =>
  console.log(`🔥 Server running at http://localhost:${PORT}`)
);
