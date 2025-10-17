import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup"; // Adjust path if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      alert(res.data);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif"
    }}>
      {!showSignup ? (
        <>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", margin: "10px", width: "250px" }}
          /><br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", margin: "10px", width: "250px" }}
          /><br />
          <button onClick={handleLogin} style={{ marginRight: "10px" }}>
            Login
          </button>
          <button onClick={() => setShowSignup(true)}>
            Signup
          </button>
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
  );
};

export default Login;





