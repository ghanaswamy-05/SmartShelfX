import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css"; // ✅ Import your CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", res.data.token);
      alert("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {!showSignup ? (
          <>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setShowSignup(true)}>Signup</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <a href="#" style={{ color: "blue" }}>Forgot Password?</a>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <button
              onClick={() => setShowSignup(false)}
              style={{
                marginTop: "20px",
                backgroundColor: "#dc3545",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;