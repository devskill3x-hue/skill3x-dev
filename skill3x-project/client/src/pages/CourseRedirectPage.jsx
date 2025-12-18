// src/pages/CourseRedirectPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CourseDetail.css";

export default function CourseRedirectPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch(`http://localhost:5000/api/courses/${courseId}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.log(err));
  }, [courseId, navigate]);

  if (!course) return <p className="loading-text">Loading...</p>;

  return (
    <div className="course-detail-wrapper">

      {/* ===== TOP HERO CARD ===== */}
      <div className="course-hero">
        <div className="course-hero-left">
          <h1 className="course-title">{course.title.toUpperCase()}</h1>
          <p className="course-author">By {course.author}</p>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: "0%" }}></div>
          </div>
          <span className="progress-percent">0%</span>

          <button className="btn-start">START LEARNING →</button>
        </div>

        <div className="course-hero-right">
          <div className="ai-box">
            <span>AI</span>
          </div>
        </div>
      </div>

      <div className="course-main-section">
        {/* ===== LEFT: CURRICULUM ===== */}
        <div className="curriculum-section">
          <h2>Curriculum</h2>

          {course.modules?.map((mod, index) => (
            <details key={index} className="module-box">
              <summary className="module-title">
                Module {index + 1}: {mod.title}
              </summary>

              <ul className="lesson-list">
                {mod.lessons?.map((lesson, i) => (
                  <li key={i} className="lesson-item">
                    📘 {lesson}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        {/* ===== RIGHT: INSTRUCTOR & RESOURCES ===== */}
        <div className="instructor-section">
          <div className="instructor-card">
            <div className="instructor-header">
              <div className="instructor-icon">📚</div>
              <div>
                <h3>{course.author}</h3>
                <p className="inst-sub">By {course.author}</p>
              </div>
            </div>

            <p className="instructor-desc">
              {course.description ||
                "Learn step-by-step with structured modules and curated learning content."}
            </p>

            <h4 className="res-title">Resources</h4>

            {(!course.resources || course.resources.length === 0) && (
              <p className="no-resources">No resources provided</p>
            )}

            {course.resources?.map((res, index) => (
              <a key={index} className="resource-item" href={res.link}>
                {res.title}
                <span className="download-icon">⬇️</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
