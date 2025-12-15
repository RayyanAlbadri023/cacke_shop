// Admin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.user.role !== "admin") {
        setError("Access denied. Admin only.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/adminhome"); // go to Admin Home
    } catch (err) {
      setError("Invalid admin email or password.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login"); // back to regular Login page
  };

  return (
    <div className="login-page">
      <div className="auth-box">
        <h2 className="login-title">Admin Login</h2>

        {error && <p className="error-text">{error}</p>}

        <label className="input-label">Email</label>
        <input
          type="email"
          placeholder="Enter admin email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="input-label">Password</label>
        <input
          type="password"
          placeholder="Enter admin password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button row */}
        <div className="button-row">
          <button className="signup-button" onClick={handleSignIn}>
            Sign In
          </button>

          <div
            className="admin-login-text"
            onClick={handleBackToLogin}
            style={{ cursor: "pointer" }}
          >
            <h3>Back to Login</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
