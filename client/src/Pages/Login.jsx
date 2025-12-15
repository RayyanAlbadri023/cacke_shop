import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginSchemaValidation } from "../Validations/loginschema";
import axios from "axios";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Auto-fill (same as previous login)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setEmail(userData.email || "");
      setPassword(userData.password || "");
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const userData = { email, password };

    try {
      await UserLoginSchemaValidation.validate(userData, {
        abortEarly: false,
      });

      const res = await axios.post(
        "http://localhost:5000/login",
        userData
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/adminhome");
      } else {
        navigate("/home");
      }
    } catch (err) {
      if (err.inner) {
        const errObj = {};
        err.inner.forEach((e) => {
          errObj[e.path] = e.message;
        });
        setErrors(errObj);
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Invalid email or password");
      }
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  const handleSignUpText = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="auth-box">
        <h2 className="login-title">Login</h2>

        {serverError && <p className="error-text">{serverError}</p>}

        <label className="input-label">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label className="input-label">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <div className="button-row">
          <button className="signup-button" onClick={handleSignIn}>
            Sign In
          </button>

          <div
            className="admin-login-text"
            onClick={handleAdminLogin}
            style={{ cursor: "pointer" }}
          >
            <h3>Admin Login</h3>
          </div>
        </div>

        <p className="signin-text">
          Already have an account?{" "}
          <span className="signin-link" onClick={handleSignUpText}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
