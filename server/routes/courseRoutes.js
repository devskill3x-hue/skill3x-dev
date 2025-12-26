import express from "express";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* -----------------------------------------
   ACCESS LEVEL PRIORITY
------------------------------------------ */
const ACCESS_PRIORITY = {
  BEGINNER: 1,
  PRO: 2,
  CAREER: 3
};

/* =====================================================
   GET ALL COURSES (LOCK / UNLOCK BASED ON PLAN)
===================================================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userPlan = req.user.plan;
    const planExpiresAt = req.user.planExpiresAt;

    const courses = await Course.find().lean();

    // 🔒 No plan or expired plan → lock all
    if (
      !userPlan ||
      !planExpiresAt ||
      new Date(planExpiresAt) < new Date()
    ) {
      const lockedCourses = courses.map(course => ({
        ...course,
        isLocked: true
      }));
      return res.json(lockedCourses);
    }

    const userLevel = ACCESS_PRIORITY[userPlan];

    const finalCourses = courses.map(course => {
      const courseLevel =
        ACCESS_PRIORITY[course.accessLevel] || 0;

      return {
        ...course,
        isLocked: courseLevel > userLevel
      };
    });

    res.json(finalCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

/* =====================================================
   GET SINGLE COURSE (SECURE ACCESS CHECK)
===================================================== */
router.get("/:courseId", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const userPlan = req.user.plan;
    const planExpiresAt = req.user.planExpiresAt;

    if (
      !userPlan ||
      !planExpiresAt ||
      new Date(planExpiresAt) < new Date()
    ) {
      return res.status(403).json({ message: "Subscription required" });
    }

    const userLevel = ACCESS_PRIORITY[userPlan];
    const courseLevel =
      ACCESS_PRIORITY[course.accessLevel] || 0;

    if (courseLevel > userLevel) {
      return res.status(403).json({ message: "Upgrade plan to access" });
    }

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
