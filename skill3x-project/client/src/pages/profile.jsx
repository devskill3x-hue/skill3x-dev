// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) =>
        setProfile({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          bio: data.bio || "",
          avatar: data.avatar || "",
        })
      );
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then(() => alert("Profile updated successfully"));
  };

  const firstLetter = profile.name ? profile.name[0].toUpperCase() : "S";

  return (
    <div className="profile-container">
      <h2 className="title">Profile</h2>

      <div className="profile-header">
        <div className="avatar-section">
          {profile.avatar ? (
            <img src={profile.avatar} className="avatar-img" alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">{firstLetter}</div>
          )}

          <input
            type="text"
            name="avatar"
            placeholder="Avatar Image URL"
            value={profile.avatar}
            onChange={handleChange}
            className="avatar-input"
          />
        </div>

        <div className="user-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>

      <div className="info-section">
        <h3>Personal Information</h3>

        <div className="input-row">
          <div className="input-group">
            <label>Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Mobile</label>
            <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} />
          </div>
        </div>

        <div className="input-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="bio-textarea"
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
