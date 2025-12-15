import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Signup";
import Welcome from "./Pages/welcome";
import Admin from "./Pages/Admin";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/Checkout";
import MapPage from "./Pages/MapPage";
import AdminHome from "./Pages/AdminHome"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />        {/* User Menu */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminhome" element={<AdminHome />} /> ✅
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
