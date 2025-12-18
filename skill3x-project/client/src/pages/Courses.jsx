import React, { useState, useEffect } from "react";
import "../styles/Courses.css";
import { useNavigate } from "react-router-dom";

/* ---------- ICONS FOR EACH COURSE ---------- */
const icons = {
  "prompt-engineering": "⚙️",
  "image-video": "🖼️",
  "workflow-automation": "🤖",
  "code-with-ai": "💻",
  "monetize-career": "📈",
  "gems": "💎",
  default: "📘"
};

/* ---------- GRADIENT COLORS ---------- */
const gradients = {
  "prompt-engineering": "linear-gradient(135deg, #3b82f6, #60a5fa)",
  "image-video": "linear-gradient(135deg, #a855f7, #c084fc)",
  "workflow-automation": "linear-gradient(135deg, #10b981, #4ade80)",
  "code-with-ai": "linear-gradient(135deg, #f59e0b, #fbbf24)",
  "monetize-career": "linear-gradient(135deg, #ef4444, #f87171)",
  "gems": "linear-gradient(135deg, #6366f1, #a5b4fc)",
  default: "linear-gradient(135deg, #64748b, #94a3b8)"
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  /* ---------- FETCH COURSES FROM BACKEND ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:5000/api/courses", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.log(err));
  }, [navigate]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="courses-container">
      <h2>My Courses</h2>

      <div className="courses-grid">
        {courses.map((course) => {
          const bg = gradients[course.id] || gradients.default;
          const icon = icons[course.id] || icons.default;

          return (
            <div
              key={course.id}
              className="course-card"
              style={{ background: bg }}
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="course-icon">{icon}</div>

              <h3>{course.title}</h3>
              <p>By {course.author}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
