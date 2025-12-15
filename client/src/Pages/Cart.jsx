import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../Features/cartSlice";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpg";
import logo from "../assets/logo.jpg";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const user = JSON.parse(localStorage.getItem("user"));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="cart-page">
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

      <section
        className="first-row full-width-row"
        style={{ justifyContent: "space-between" }}
      >
        <h1 className="left-text mrs-sheppards" style={{ color: "white" }}>
          My Cart
        </h1>
        <img src={img1} alt="Dessert" className="right-img" />
      </section>

      <div className="spacer"></div>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          🛒 Cart is empty. Go to Menu and add items.
        </p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150x100?text=No+Image")
                }
              />

              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">
                  {item.price.toFixed(2)} OMR
                </p>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: item.id, change: -1 })
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: item.id, change: 1 })
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="delete-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="summary-box full-width-summary">
          <div className="row">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} OMR</span>
          </div>
          <div className="row">
            <span>Tax (5%)</span>
            <span>{tax.toFixed(2)} OMR</span>
          </div>
          <div className="row total-row">
            <span>Total</span>
            <span>{total.toFixed(2)} OMR</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}

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

export default Cart;
