import React, { useState, useEffect } from "react";
import "../styles/Courses.css";
import { useNavigate } from "react-router-dom";

/* ---------- IMAGE IMPORTS ---------- */
import skill3x from "../image/skill3x.png";
import imgPromptEng from "../image/illustration-prompt.jpeg";
import imgImageVideo from "../image/illustration-video.jpeg";
import imgWorkflow from "../image/illustration-workflow.jpeg";
import imgCodeAi from "../image/illustration-code.jpeg";
import imgMonetize from "../image/illustration-monetize.jpeg";
import imgGems from "../image/illustration-gems.jpeg";
import imgDefault from "../image/skill3x.png";

/* ---------- IMAGE MAPPING ---------- */
const courseIllustrations = {
  "prompt-engineering": imgPromptEng,
  "image-video": imgImageVideo,
  "workflow-automation": imgWorkflow,
  "code-with-ai": imgCodeAi,
  "monetize-career": imgMonetize,
  "gems": imgGems,
  default: imgDefault
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    fetch("http://localhost:5000/api/courses", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="courses-container loading-state">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="courses-container">
      <h2>My Courses</h2>

      {/* 🔔 SUBSCRIPTION BANNER */}
      {!hasActiveSubscription && (
        <div className="subscription-banner">
          <div>
            <h3>🔒 Subscribe to unlock all courses</h3>
            <p>Get full access to AI courses, projects, and premium tools.</p>
          </div>
          <button onClick={() => navigate("/subscription")}>
            View Plans
          </button>
        </div>
      )}

      <div className="courses-grid">
        {courses.map(course => {
          const illustration =
            courseIllustrations[course.slug] ||
            courseIllustrations.default;

          const isLocked = course.isLocked || !hasActiveSubscription;

          return (
            <div
              key={course._id}
              className={`course-card ${isLocked ? "locked" : ""}`}
            >
              {/* Banner */}
              <div className="card-banner">
                <img src={skill3x} alt="Skill3X Logo" className="card-logo" />
                <img
                  src={illustration}
                  alt={course.title}
                  className="card-illustration"
                />
              </div>

              {/* Content */}
              <div className="card-content">
                <h3>{course.title}</h3>

                <div className="card-actions">
                  <button
                    className="start-learning-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 important
                      console.log("BUTTON CLICKED", course._id, isLocked);

                      if (isLocked) {
                        navigate("/subscription");
                      } else {
                        navigate(`/courses/${course._id}`);
                      }
                    }}
                  >
                    Start Learning
                  </button>
                </div>
              </div>

              {/* Overlay */}
              {isLocked && (
                <div className="lock-overlay">
                  <span>🔒 Locked</span>
                  <button
                    className="upgrade-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/subscription");
                    }}
                  >
                    Subscribe Now
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
