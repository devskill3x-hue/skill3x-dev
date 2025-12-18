// server/seed_courses.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js"; // adjust path if needed

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const courses = [
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      author: "AI Experts",
      description:
        "Master prompt design to get powerful, reliable outputs from LLMs.",
      banner:
        "https://images.unsplash.com/photo-1581093588401-6bfb0c7f8b0f?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=example", // image url (replace with your own)
      progress: 0,
      modules: [
        {
          id: "m1",
          title: "Introduction",
          lessons: [
            { id: "m1-l1", title: "What is Prompt Engineering?" },
            { id: "m1-l2", title: "Prompting best practices" }
          ]
        },
        {
          id: "m2",
          title: "Advanced Techniques",
          lessons: [
            { id: "m2-l1", title: "Chain-of-Thought prompting" },
            { id: "m2-l2", title: "Prompt templates & tuning" }
          ]
        }
      ],
      resources: [
        { title: "Prompt Engineering Guide.pdf", link: "https://example.com/pe-guide.pdf" }
      ]
    },

    {
      id: "image-video",
      title: "Image and Video (Ads Content Generator)",
      author: "Creative AI",
      description: "Create eye-catching ads using generative image & video tools.",
      banner:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      progress: 0,
      modules: [
        {
          id: "m1",
          title: "Foundations",
          lessons: [{ id: "m1-l1", title: "Image generation basics" }]
        },
        {
          id: "m2",
          title: "Video generation",
          lessons: [{ id: "m2-l1", title: "Short-form ads generation" }]
        }
      ],
      resources: []
    },

    {
      id: "workflow-automation",
      title: "Workflow Automation using AI Agents",
      author: "Tech Automators",
      description: "Automate repetitive tasks with AI agents and pipelines.",
      banner:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      progress: 0,
      modules: [
        {
          id: "m1",
          title: "Building agents",
          lessons: [{ id: "m1-l1", title: "Agents 101" }]
        }
      ],
      resources: []
    },

    {
      id: "code-with-ai",
      title: "Code with AI",
      author: "Dev Gurus",
      description: "Use AI to write, review and debug code faster.",
      banner:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      progress: 0,
      modules: [
        {
          id: "m1",
          title: "AI in IDEs",
          lessons: [{ id: "m1-l1", title: "Setup & Plugins" }]
        }
      ],
      resources: []
    },

    {
      id: "monetize-career",
      title: "Monetize your Career",
      author: "Career Coaches",
      description: "Strategies to package your skills and earn more.",
      banner:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      progress: 0,
      modules: [
        {
          id: "m1",
          title: "Market research",
          lessons: [{ id: "m1-l1", title: "Finding demand" }]
        }
      ],
      resources: []
    },

    {
      id: "gems",
      title: "Explore Our Gems",
      author: "Gemini",
      description: "Specialized AI companions & micro-tools.",
      banner:
        "https://images.unsplash.com/photo-1526378724031-9ae0b5a3b3b9?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      progress: 0,
      modules: [
        {
          id: "m1",
          title: "Gems overview",
          lessons: [{ id: "m1-l1", title: "What Gems can do" }]
        }
      ],
      resources: []
    }
  ];

  // Upsert each course (update if exists, otherwise insert)
  for (const c of courses) {
    await Course.updateOne({ id: c.id }, { $set: c }, { upsert: true });
    console.log(`Upserted course: ${c.id}`);
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
