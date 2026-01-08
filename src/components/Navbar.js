import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleTrack = () => {
    if (!orderId.trim()) {
      alert("Please enter Order ID");
      return;
    }
    navigate(`/track-order/${orderId}`); // ✅ FIXED PATH
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">

        {/* LEFT — LOGO */}
        <h2 className="logo">Saree Lover</h2>

        {/* CENTER — LINKS */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/wishlist">Wishlist </Link></li>
        </ul>

        {/* TRACK ORDER */}
        <div className="track-box">
          <input
            type="text"
            placeholder="Track Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button onClick={handleTrack}>Track</button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">
          <Link className="btn-outline" to="/cart">Cart</Link>

          {user ? (
            <>
              <Link className="btn-light" to="/profile">Profile</Link>
              <button className="btn-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-light" to="/login">Login</Link>
              <Link className="btn-light" to="/signup">Signup</Link>
            </>
          )}

          {/* ADMIN */}
          <div className="admin-dropdown">
            <button className="btn-admin">Admin ▾</button>
            <div className="admin-menu">
              <Link to="/admin/login">Admin Login</Link>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/upload">Upload Saree</Link>
              <Link to="/admin/orders">Orders</Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
