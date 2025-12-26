import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const courses = [
      {
        id: "prompt-engineering",
        title: "Prompt Engineering",
        author: "AI Experts",
        description:
          "Master prompt design to get powerful, reliable outputs from LLMs.",
        image:
          "https://images.unsplash.com/photo-1581093588401-6bfb0c7f8b0f?q=80&w=1400",
        accessLevel: "BEGINNER",

        modules: [
          {
            id: "m1",
            title: "Introduction",
            lessons: [
              { id: "m1-l1", title: "What is Prompt Engineering?" },
              { id: "m1-l2", title: "Prompting Best Practices" }
            ]
          },
          {
            id: "m2",
            title: "Advanced Prompting",
            lessons: [
              { id: "m2-l1", title: "Chain of Thought" },
              { id: "m2-l2", title: "Prompt Templates" }
            ]
          }
        ]
      },

      {
        id: "image-video",
        title: "Image and Video (Ads Content Generator)",
        author: "Creative AI",
        description:
          "Create eye-catching ads using generative image & video tools.",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400",
        accessLevel: "BEGINNER",

        modules: [
          {
            id: "m1",
            title: "Image Ads",
            lessons: [
              { id: "m1-l1", title: "Image generation basics" },
              { id: "m1-l2", title: "Ad creatives & styles" }
            ]
          },
          {
            id: "m2",
            title: "Video Ads",
            lessons: [
              { id: "m2-l1", title: "Short-form video ads" },
              { id: "m2-l2", title: "Hooks & CTA strategies" }
            ]
          }
        ]
      },

      {
        id: "workflow-automation",
        title: "Workflow Automation using AI Agents",
        author: "Tech Automators",
        description:
          "Automate repetitive tasks using AI agents and workflows.",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400",
        accessLevel: "PRO",

        modules: [
          {
            id: "m1",
            title: "Agents Basics",
            lessons: [
              { id: "m1-l1", title: "What are AI Agents?" },
              { id: "m1-l2", title: "Agent Architecture" }
            ]
          },
          {
            id: "m2",
            title: "Advanced Automation",
            lessons: [
              { id: "m2-l1", title: "Multi-agent workflows" }
            ]
          }
        ]
      },

      {
        id: "code-with-ai",
        title: "Code with AI",
        author: "Dev Gurus",
        description:
          "Use AI to write, review, and debug code faster.",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400",
        accessLevel: "PRO",

        modules: [
          {
            id: "m1",
            title: "AI in Coding",
            lessons: [
              { id: "m1-l1", title: "AI IDE tools" },
              { id: "m1-l2", title: "Prompting for code" }
            ]
          }
        ]
      },

      {
        id: "monetize-career",
        title: "Monetize Your Career",
        author: "Career Coaches",
        description:
          "Turn your skills into income with AI-driven strategies.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400",
        accessLevel: "CAREER",

        modules: [
          {
            id: "m1",
            title: "Market Research",
            lessons: [
              { id: "m1-l1", title: "Finding high-demand skills" }
            ]
          },
          {
            id: "m2",
            title: "Monetization Models",
            lessons: [
              { id: "m2-l1", title: "Freelancing & products" }
            ]
          }
        ]
      }
    ];

    for (const course of courses) {
      await Course.updateOne(
        { id: course.id },
        { $set: course },
        { upsert: true }
      );
      console.log(`✅ Seeded: ${course.id}`);
    }

    console.log("🎉 Course seeding completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedCourses();
