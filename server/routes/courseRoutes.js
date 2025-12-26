import express from "express";
import Course from "../models/Course.js";
import Chapter from "../models/Chapter.js";
import Exercise from "../models/Exercise.js";
import Project from "../models/Project.js";
import Resource from "../models/Resource.js";
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
    const courses = await Course.find().lean();
    const { plan, planExpiresAt } = req.user;

    // 🔒 No plan or expired plan → lock all
    if (!plan || !planExpiresAt || new Date(planExpiresAt) < new Date()) {
      return res.json(courses.map(c => ({ ...c, isLocked: true })));
    }

    const userLevel = ACCESS_PRIORITY[plan];

    const finalCourses = courses.map(course => ({
      ...course,
      isLocked: ACCESS_PRIORITY[course.accessLevel] > userLevel
    }));

    res.json(finalCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

/* =====================================================
   GET COURSE FULL (COURSE + CHAPTERS + EXERCISES + PROJECTS + RESOURCES)
===================================================== */
router.get("/:courseId/full", authMiddleware, async (req, res) => {
  try {
    /* ---------- FETCH COURSE BY _id ---------- */
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { plan, planExpiresAt } = req.user;

    /* ---------- ACCESS CHECK ---------- */
    if (
      !plan ||
      !planExpiresAt ||
      new Date(planExpiresAt) < new Date() ||
      ACCESS_PRIORITY[course.accessLevel] >
        ACCESS_PRIORITY[plan]
    ) {
      return res.status(403).json({ message: "Upgrade required" });
    }

    /* ---------- FETCH RELATED DATA USING COURSE SLUG ---------- */
    const courseSlug = course.id; // e.g. "prompt-engineering"

    const [chapters, exercises, projects, resources] = await Promise.all([
      Chapter.find({ courseId: courseSlug }).sort({ order: 1 }),
      Exercise.find({ courseId: courseSlug }).sort({ order: 1 }),
      Project.find({ courseId: courseSlug }),
      Resource.find({ courseId: courseSlug })
    ]);

    /* ---------- RESPONSE ---------- */
    res.json({
      course,
      chapters,
      exercises,
      projects,
      resources
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load course" });
  }
});

export default router;
