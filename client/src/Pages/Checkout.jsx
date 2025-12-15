import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Features/cartSlice";
import "./checkout.css";
import logo from "../assets/logo.jpg";
import img1 from "../assets/img1.jpg";
import MastercardIcon from "../assets/Mastercard.png";
import PaypalIcon from "../assets/paypal.png";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const placeOrder = () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    dispatch(clearCart());
    navigate("/map"); // ✅ GO TO MAP PAGE
  };

  return (
    <div className="checkout-page">
      <header className="header">
        <div className="logo-text" onClick={() => navigate("/home")}>
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ cursor: "pointer" }}
          />
        </div>

        <nav className="nav-buttons">
          {!user && (
            <>
              <span onClick={() => navigate("/register")}>Register</span>
              <span onClick={() => navigate("/login")}>Login</span>
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

      <section className="first-row checkout-first-row">
        <div className="left-text mrs-sheppards">Checkout</div>
        <img src={img1} alt="Dessert" className="right-img" />
      </section>

      <div className="spacer"></div>

      <div className="box">
        <h3>Customer Info</h3>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>

      <div className="box">
        <h3>Payment Methods</h3>

        <div className="payment">
          <img src={MastercardIcon} alt="MasterCard" className="pay-img" />
          <span>MasterCard</span>
          <input
            type="radio"
            name="pay"
            value="MasterCard"
            checked={paymentMethod === "MasterCard"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className="payment">
          <img src={PaypalIcon} alt="PayPal" className="pay-img" />
          <span>PayPal</span>
          <input
            type="radio"
            name="pay"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="box">
        <h3>Summary</h3>
        <p>
          Subtotal: <b>{subtotal.toFixed(2)} OMR</b>
        </p>
        <p>
          Tax (5%): <b>{tax.toFixed(2)} OMR</b>
        </p>
        <p>
          Total: <b>{total.toFixed(2)} OMR</b>
        </p>
      </div>

      <button className="place-order-btn" onClick={placeOrder}>
        Place Order
      </button>

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

export default CheckoutPage;
