// src/Pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRegisterSchemaValidation } from "../Validations/signupschema";
import axios from "axios";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const userData = {
      name,
      email,
      phone,
      password,
    };

    try {
      // Validate all fields
      await UserRegisterSchemaValidation.validate(userData, { abortEarly: false });

      // Post data to backend
      await axios.post("http://localhost:5000/signup", userData);

      // Redirect to login page after successful signup
      navigate("/login");
    } catch (err) {
      if (err.inner) {
        // Validation errors
        const errObj = {};
        err.inner.forEach((error) => {
          errObj[error.path] = error.message;
        });
        setErrors(errObj);
      } else if (err.response) {
        // Server errors
        setServerError(err.response.data.message);
      } else {
        setServerError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-page register-page">
      <div className="auth-box updated-login-box">
        <h2 className="login-title">Register</h2>

        {serverError && <p className="error-text">{serverError}</p>}

        <label className="input-label">Full Name</label>
        <input
          type="text"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <label className="input-label">Email</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label className="input-label">Phone Number</label>
        <input
          type="text"
          className="auth-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <label className="input-label">Password</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <div className="middle-button">
          <button className="signup-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        <p className="signin-text">
          Already have an account?{" "}
          <span className="signin-link" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
