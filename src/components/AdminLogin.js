import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ ADD THIS

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@saree.com" && password === "admin123") {
      localStorage.setItem("admin", "true");
      onLogin();                     // update state
      navigate("/admin/dashboard");  // ✅ REDIRECT TO DASHBOARD
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
