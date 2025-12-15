import React from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css"; // reuse Checkout/Home CSS
import logo from "../assets/logo.jpg";
import img1 from "../assets/img1.jpg";

const MapPage = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-page">

      {/* Header same as Home */}
      <header className="header">
       <div className="logo-text" onClick={() => navigate("/home")}>
    <img
      src={logo}
      alt="Logo"
      className="logo"
      style={{ cursor: "pointer" }} // optional: show it's clickable
    />
  </div>

        <nav className="nav-buttons">
          <span onClick={() => navigate("/register")}>Register</span>
          <span onClick={() => navigate("/login")}>Login</span>
          <span onClick={() => navigate("/menu")}>Menu</span>
          <span onClick={() => navigate("/cart")}>Cart</span>
        </nav>
      </header>

      {/* First Row same as Home — FULL WIDTH */}
      <section className="first-row full-width-row checkout-first-row">
        <div className="left-text mrs-sheppards">Order Tracking</div>
        <img src={img1} alt="Dessert" className="right-img" />
      </section>

      <div className="spacer"></div>

      {/* Map Box */}
      <div className="box">
        <iframe
          width="100%"
          height="300px"
          src="https://maps.google.com/maps?q=23.6100,58.5453&output=embed"
          style={{ borderRadius: "8px", border: "none" }}
          title="Order Location"
        ></iframe>
      </div>

      {/* Status Row */}
      <div className="box status-row">
        <span>Salim is in the way</span>
        <div className="status-icons">
          <button className="icon-btn">📞</button>
          <button className="icon-btn">💬</button>
        </div>
      </div>

      {/* Done Button */}
      <button className="place-order-btn">Done</button>

      {/* Footer same as Home */}
      <footer className="footer">
        <img src={logo} alt="Logo" className="footer-logo" />
        <p>
          Made with love and a touch of sweetness <br />
          © 2025 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MapPage;
