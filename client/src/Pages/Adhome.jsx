// AdHome.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialCards = [
  { id: 1, img: img1, name: "Dessert 1", price: 5.0 },
  { id: 2, img: img2, name: "Dessert 2", price: 6.5 },
  { id: 3, img: img3, name: "Dessert 3", price: 7.0 },
  { id: 4, img: img4, name: "Dessert 4", price: 4.5 },
  { id: 5, img: img5, name: "Dessert 5", price: 8.0 },
  { id: 6, img: img1, name: "Dessert 6", price: 5.5 },
  { id: 7, img: img2, name: "Dessert 7", price: 6.0 },
  { id: 8, img: img3, name: "Dessert 8", price: 7.5 },
  { id: 9, img: img4, name: "Dessert 9", price: 6.2 },
  { id: 10, img: img5, name: "Dessert 10", price: 5.8 },
  { id: 11, img: img1, name: "Dessert 11", price: 6.9 },
  { id: 12, img: img2, name: "Dessert 12", price: 7.1 },
];

const AdHome = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState(initialCards);
  const [newItem, setNewItem] = useState({ img: "", name: "", price: "" });

  const handleEdit = (id, field, value) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleNewItemChange = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  const handleNewItemUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({ ...newItem, img: URL.createObjectURL(file) });
    }
  };

  const handleAddNewItem = () => {
    if (newItem.name && newItem.price && newItem.img) {
      setCards([...cards, { ...newItem, id: cards.length + 1 }]);
      setNewItem({ img: "", name: "", price: "" });
    } else {
      alert("Please provide image, name, and price for new item.");
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="logo-text">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="nav-buttons">
          <span onClick={() => navigate("/register")}>Register</span>
          <span onClick={() => navigate("/login")}>Login</span>
          <span onClick={() => navigate("/menu")}>Menu</span>
          <span onClick={() => navigate("/cart")}>Cart</span>
        </nav>
      </header>

      {/* First Row */}
      <section className="first-row full-width-row">
        <div className="left-text mrs-sheppards">
          Admin update, add and delete items
        </div>
      </section>

      {/* Spacer */}
      <div className="spacer"></div>

      {/* Cards Section */}
      <section className="signature full-width-row">
        <h3 className="mrs-sheppards">Manage Desserts</h3>
        <div className="cards">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <img src={card.img} alt={card.name} />
              <input
                type="text"
                value={card.name}
                onChange={(e) => handleEdit(card.id, "name", e.target.value)}
                style={{ width: "90%", margin: "5px 0" }}
              />
              <input
                type="number"
                value={card.price}
                onChange={(e) => handleEdit(card.id, "price", e.target.value)}
                style={{ width: "90%", marginBottom: "5px" }}
              />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <FaEdit
                  style={{ cursor: "pointer" }}
                  onClick={() => alert("You can edit by changing inputs")}
                />
                <FaTrash
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(card.id)}
                />
              </div>
            </div>
          ))}

          {/* New Item Card */}
          <div className="card">
            <input type="file" onChange={handleNewItemUpload} />
            {newItem.img && <img src={newItem.img} alt="New Item" />}
            <input
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => handleNewItemChange("name", e.target.value)}
              style={{ width: "90%", margin: "5px 0" }}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => handleNewItemChange("price", e.target.value)}
              style={{ width: "90%", marginBottom: "5px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <FaEdit
                style={{ cursor: "pointer" }}
                onClick={() => alert("You can edit by changing inputs")}
              />
              <FaTrash
                style={{ cursor: "pointer" }}
                onClick={handleAddNewItem}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src={logo} alt="Logo" className="footer-logo" />
      </footer>
    </div>
  );
};

export default AdHome;
