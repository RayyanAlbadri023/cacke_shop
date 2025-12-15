import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDesserts } from "../Features/dessertSlice";
import { addToCart } from "../Features/cartSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import img1 from "../assets/img1.jpg";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const MenuPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { desserts, isLoading } = useSelector((state) => state.desserts);
  const user = JSON.parse(localStorage.getItem("user"));

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getDesserts());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        customerId: user?._id || null,
        id: item._id,
        name: item.name,
        price: item.finalPrice ?? item.price,
        quantity: 1,
        image: item.image,
      })
    );

    setMessage(`${item.name} added to cart`);
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="menu-page">
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

      <section className="first-row full-width-row">
        <h1 className="left-text mrs-sheppards" style={{ color: "white" }}>
          Menu
        </h1>
        <img src={img1} alt="Dessert" className="right-img" />
      </section>

      <div className="spacer"></div>

      {message && (
        <p style={{ textAlign: "center", color: "green", fontWeight: "600" }}>
          {message}
        </p>
      )}

      <div className="menu-grid-container">
        <div className="menu-grid">
          {isLoading && <h2>Loading...</h2>}

          {desserts
            .filter(
              (item) =>
                item.name &&
                item.image &&
                (item.finalPrice !== undefined || item.price !== undefined)
            )
            .map((item) => (
              <Card className="dessert-card" key={item._id}>
                <CardHeader style={{ padding: 0 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="dessert-img"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image")
                    }
                  />
                </CardHeader>

                <CardBody className="dessert-info">
                  <CardTitle className="dessert-name">
                    {item.name}
                  </CardTitle>
                  <CardText className="dessert-price">
                    {item.finalPrice ?? item.price} OMR
                  </CardText>
                </CardBody>

                <CardFooter>
                  <Button
                    className="add-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <button className="checkout-btn" onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      </div>

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

export default MenuPage;
