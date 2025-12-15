import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login"); // navigate to login after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#FFE2CF]">
      <img
        src={logo}
        alt="Logo"
        className="w-60 h-60 object-contain animate-fade-in"
      />
    </div>
  );
}
