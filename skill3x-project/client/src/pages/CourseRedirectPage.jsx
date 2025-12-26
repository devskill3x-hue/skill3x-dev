// src/pages/CourseRedirectPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CourseFullPage.css";

const TABS = ["chapters", "exercises", "projects", "resources"];

const getIcon = (type) => {
  switch (type) {
    case "chapters": return "📚";
    case "exercises": return "🎯";
    case "projects": return "🏆";
    case "resources": return "📂";
    default: return "📄";
  }
};

export default function CourseFullPage() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("chapters");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/courses/${courseId}/full`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load course");
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <div className="cfp-loading">Loading course...</div>;
  if (!data || !data.course)
    return <div className="cfp-loading">Failed to load course</div>;

  const { course, chapters = [], exercises = [], projects = [], resources = [] } = data;

  return (
    <div className="cfp-wrapper">
      <div className="cfp-container">

        {/* ===== HEADER ===== */}
        <div className="cfp-header-card">
          <div className="cfp-header-content">
            <h1 className="cfp-header-title">{course.title}</h1>
            <p className="cfp-header-author">By {course.author}</p>
            <p className="cfp-header-desc">{course.description}</p>
          </div>
          <div className="cfp-header-right">
            <div className="cfp-progress-circle">
              <span>0%</span>
            </div>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="cfp-tabs-container">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cfp-tab-btn ${activeTab === tab ? "active" : ""}`}
            >
              <span className="cfp-tab-icon">{getIcon(tab)}</span>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="cfp-content-area">
          {activeTab === "chapters" && <ChapterTab chapters={chapters} />}
          {activeTab === "exercises" && <ExerciseTab exercises={exercises} />}
          {activeTab === "projects" && <ProjectTab projects={projects} />}
          {activeTab === "resources" && <ResourceTab resources={resources} />}
        </div>

      </div>
    </div>
  );
}

/* ---------------- TAB COMPONENTS ---------------- */

function ChapterTab({ chapters }) {
  if (!chapters.length) return <p className="cfp-empty-msg">No chapters yet</p>;

  return (
    <div className="cfp-list-container">
      {chapters.map((ch) => (
        <div key={ch.id} className="cfp-row cfp-row-chapter">
          <div className="cfp-row-left">
            <span className="cfp-row-icon">📺</span>
            <div className="cfp-row-info">
              <strong>Chapter {ch.order}: {ch.title}</strong>
            </div>
          </div>
          <button className="cfp-btn-action">Start</button>
        </div>
      ))}
    </div>
  );
}

function ExerciseTab({ exercises }) {
  if (!exercises.length) return <p className="cfp-empty-msg">No exercises yet</p>;

  return (
    <div className="cfp-list-container">
      {exercises.map((ex) => (
        <div key={ex.id} className="cfp-row cfp-row-exercise">
          <div className="cfp-row-left">
            <span className="cfp-row-icon">🎯</span>
            <div className="cfp-row-info">
              <strong>Exercise {ex.order}: {ex.title}</strong>
              <p className="cfp-row-subtext">{ex.instructions}</p>
            </div>
          </div>
          <span className="cfp-badge-gold">Practice</span>
        </div>
      ))}
    </div>
  );
}

function ProjectTab({ projects }) {
  if (!projects.length) return <p className="cfp-empty-msg">No projects yet</p>;

  return (
    <div className="cfp-list-container">
      {projects.map((pr) => (
        <div key={pr.id} className="cfp-project-card">
          <div className="cfp-project-header">
            <span className="cfp-row-icon">🏆</span>
            <h3>{pr.title}</h3>
          </div>
          <p className="cfp-project-desc">{pr.description}</p>
        </div>
      ))}
    </div>
  );
}

function ResourceTab({ resources }) {
  if (!resources.length) return <p className="cfp-empty-msg">No resources yet</p>;

  return (
    <div className="cfp-grid-container">
      {resources.map((res) => (
        <a
          key={res._id}
          href={res.url}
          target="_blank"
          rel="noreferrer"
          className="cfp-resource-card"
        >
          <div className="cfp-res-icon">⬇️</div>
          <div className="cfp-res-info">
            <strong>{res.title}</strong>
            <span>{res.resourceType}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
