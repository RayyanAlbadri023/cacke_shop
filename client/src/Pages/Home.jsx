import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="logo-text">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <nav className="nav-buttons">
          {!user && (
            <>
              <span onClick={() => navigate("/register")}>Register</span>
              <br />
              <span onClick={() => navigate("/login")}>Login</span>
              <span onClick={() => navigate("/menu")}>Menu</span>
              <span onClick={() => navigate("/cart")}>Cart</span>
            </>
          )}

          {user && (
            <>
              <span onClick={() => navigate("/menu")}>Menu</span>
              <span onClick={() => navigate("/cart")}>Cart</span>
              <span onClick={handleLogout}>Logout</span>
            </>
          )}
        </nav>
      </header>

      {/* First Row */}
      <section className="first-row full-width-row">
        <div className="left-text mrs-sheppards">Bite into Happiness</div>
        <button className="order-btn" onClick={() => navigate("/menu")}>
          Order Now
        </button>
        <img src={img1} alt="Dessert" className="right-img" />
      </section>

      {/* Spacer */}
      <div className="spacer"></div>

      {/* About Us */}
      <section className="about-us full-width-row">
        <img src={img2} alt="About us" className="about-img" />
        <div className="about-text">
          <h4>About Us</h4>
          <h6>
            Driven by passion and flavor, we create handcrafted sweets that
            combine quality, creativity, and care. Each dessert is made fresh
            daily to ensure an unforgettable taste and a beautiful presentation
            for every occasion.
          </h6>
        </div>
      </section>

      {/* Signature */}
      <section className="signature full-width-row">
        <h3 className="mrs-sheppards">Signature</h3>
        <div className="cards">
          <div className="card">
            <img src={img3} alt="Dessert 1" />
            <p>Dessert 1</p>
          </div>
          <div className="card">
            <img src={img4} alt="Dessert 2" />
            <p>Dessert 2</p>
          </div>
          <div className="card">
            <img src={img5} alt="Dessert 3" />
            <p>Dessert 3</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src={logo} alt="Logo" className="footer-logo" />
        <p>
          Made with love and a touch of sweetness
          <br />
          © 2025 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
