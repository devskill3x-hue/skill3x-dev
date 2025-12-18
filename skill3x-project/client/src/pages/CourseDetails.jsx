import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/courses/${id}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setCourse(data));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{course.title}</h2>
      <p>By {course.author}</p>
      <p>{course.description}</p>
    </div>
  );
}
