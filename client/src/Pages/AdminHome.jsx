import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";
import img1 from "../assets/img1.jpg";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../App.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchDesserts();
  }, []);

  const fetchDesserts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getDesserts");
      setDesserts(res.data.desserts);
    } catch (error) {
      console.error("Error fetching desserts:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ====================== ADD DESSERT ======================
  const handleAdd = async () => {
    const name = prompt("Dessert name:");
    const price = prompt("Price:");
    const category = prompt("Category:");
    const image = prompt("Image URL:");

    if (!name || !price || !category || !image) return;

    try {
      // إرسال البيانات للسيرفر وحفظها في MongoDB
      await axios.post("http://localhost:5000/createDessert", {
        name,
        price: Number(price),
        category,
        image,
      });

      // إعادة جلب البيانات من السيرفر لعرضها فورًا
      fetchDesserts();
    } catch (error) {
      console.error("Error adding dessert:", error);
    }
  };

  const handleEdit = async (item) => {
    const name = prompt("Name:", item.name);
    const price = prompt("Price:", item.price);
    const category = prompt("Category:", item.category);
    const image = prompt("Image URL:", item.image);

    if (!name || !price || !category || !image) return;

    try {
      await axios.put("http://localhost:5000/updateDessert", {
        _id: item._id,
        name,
        price: Number(price),
        category,
        image,
      });
      fetchDesserts();
    } catch (error) {
      console.error("Error updating dessert:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this dessert?")) return;

    try {
      await axios.delete(`http://localhost:5000/deleteDessert/${id}`);
      fetchDesserts();
    } catch (error) {
      console.error("Error deleting dessert:", error);
    }
  };

  return (
    <div className="menu-page">
      {/* Header */}
      <header className="header">
        <div className="logo-text">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <nav className="nav-buttons">
          <span onClick={handleAdd}>Add Dessert</span>
          <span onClick={handleLogout}>Logout</span>
        </nav>
      </header>

      {/* First Row */}
      <section className="first-row full-width-row">
        <h1 className="left-text mrs-sheppards" style={{ color: "white" }}>
          Admin Dashboard
        </h1>
        <img src={img1} alt="Dessert" className="right-img" />
      </section>

      <div className="spacer"></div>

      {/* Cards Grid */}
      <div className="menu-grid">
        {desserts.map((item) => (
          <div className="dessert-card" key={item._id}>
            <img
              src={item.image}
              alt={item.name}
              className="dessert-img"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />

            <div className="dessert-info">
              <h3 className="dessert-name">{item.name}</h3>
              <p className="dessert-price">{item.price} OMR</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                paddingBottom: "15px",
              }}
            >
              <button
                style={{ border: "none", background: "none", cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              >
                <FaEdit size={18} />
              </button>

              <button
                style={{ border: "none", background: "none", cursor: "pointer" }}
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div
          className="dessert-card"
          style={{ cursor: "pointer" }}
          onClick={handleAdd}
        >
          <img
            src="https://via.placeholder.com/300x200?text=Add+New"
            className="dessert-img"
            alt="Add"
          />
          <div className="dessert-info">
            <h3 className="dessert-name">Add New Dessert</h3>
          </div>

          <div style={{ paddingBottom: "15px" }}>
            <FaPlus size={18} />
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default AdminHome;
