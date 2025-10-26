import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./IntroPage.css";

const IntroPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleProtectedNav = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  const handleEmployeeNav = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/employees");
    } else {
      navigate("/login");
    }
  };


  return (
    <div>




      <div className={`intro-container ${fadeIn ? "fade-in" : ""}`}>
        <h1 className="intro-title">📦 Welcome to SmartShelfX</h1>
        <p className="intro-description">
          SmartShelfX is your intelligent inventory manager. Seamlessly track products, monitor stock levels, and automate reordering to keep your business running smoothly.
        </p>
        <p className="intro-subtext">
          Whether you're managing a warehouse or a retail store, SmartShelfX helps you stay ahead of stockouts and streamline operations.
        </p>
        <Link to="/login">
          <button className="login-button">Login to Continue</button>
        </Link>
      </div>


    </div>
  );
};

export default IntroPage;