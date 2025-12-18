import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

async function addCourses() {
  await Course.insertMany([
    { id: "prompt-engineering", title: "Prompt Engineering", author: "AI Experts" },
    { id: "image-video", title: "Image and Video (Ads Content Generator)", author: "Creative AI" },
    { id: "workflow-automation", title: "Workflow Automation using AI Agents", author: "Tech Automators" },
    { id: "code-with-ai", title: "Code with AI", author: "Dev Gurus" },
    { id: "monetize-career", title: "Monetize your Career", author: "Career Coaches" },
    { id: "gems", title: "Explore Our Gems", author: "Gemini" }
  ]);

  console.log("Courses added");
  process.exit();
}
addCourses();
