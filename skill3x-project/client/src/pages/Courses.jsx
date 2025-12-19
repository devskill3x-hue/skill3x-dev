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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ---------- USER & SUBSCRIPTION STATE ---------- */
  const user = JSON.parse(localStorage.getItem("user"));
  const hasActiveSubscription =
    user?.planExpiresAt &&
    new Date(user.planExpiresAt) > new Date();

  /* ---------- FETCH COURSES ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/courses/all", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Course fetch error:", err);
        setLoading(false);
      });
  }, [navigate]);

  /* ---------- COURSE CLICK ---------- */
  const handleCourseClick = (course) => {
    if (course.isLocked) {
      navigate("/subscription");
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  if (loading) {
    return <div className="courses-container">Loading courses...</div>;
  }

  return (
    <div className="courses-container">
      <h2>My Courses</h2>

      {/* 🔔 SUBSCRIPTION BANNER */}
      {!hasActiveSubscription && (
        <div className="subscription-banner">
          <div>
            <h3>🔒 Subscribe to unlock all courses</h3>
            <p>
              Get full access to AI courses, projects, and premium tools.
            </p>
          </div>
          <button onClick={() => navigate("/subscription")}>
            View Plans
          </button>
        </div>
      )}

      {/* ---------- COURSES GRID ---------- */}
      <div className="courses-grid">
        {courses.map(course => {
          const bg = gradients[course.id] || gradients.default;
          const icon = icons[course.id] || icons.default;

          return (
            <div
              key={course.id}
              className={`course-card ${course.isLocked ? "locked" : ""}`}
              style={{ background: bg }}
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-icon">{icon}</div>
              <h3>{course.title}</h3>
              <p>By {course.author}</p>

              {course.isLocked && (
                <div className="lock-overlay">
                  <span>🔒 Locked</span>
                  <button className="upgrade-btn">
                    Subscribe to Unlock
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
