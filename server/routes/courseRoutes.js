import express from "express";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all courses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET single course by id
router.get("/:courseId", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.courseId });

    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
