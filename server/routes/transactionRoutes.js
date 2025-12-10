import express from "express";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 GET all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 POST - Add new transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { course, amount, status } = req.body;

    const transaction = await Transaction.create({
      userId: req.user.id,
      course,
      amount,
      status,
      transactionId: "TXN" + Math.floor(Math.random() * 100000),
    });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

export default router;
