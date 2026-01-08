import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

import Wishlist from "./wishlist/Wishlist";
import Cart from "./pages/Cart";

import AdminUpload from "./components/AdminUpload";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminOrders from "./components/AdminOrders";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Profile from "./pages/Profile";

import TrackOrder from "./pages/TrackOrder";

import "./App.css";

function App() {
  const [adminLogged, setAdminLogged] = useState(
    localStorage.getItem("admin") === "true"
  );

  return (
    <Router>
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* ================= TRACK ORDER ================= */}
          <Route path="/track-order/:id" element={<TrackOrder />} />

          {/* ================= USER AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={() => setAdminLogged(true)} />}
          />

          <Route
            path="/admin/dashboard"
            element={
              adminLogged ? (
                <div style={{ padding: "20px" }}>
                  <h1>Admin Dashboard</h1>
                  <button
                    className="logout-btn"
                    onClick={() => {
                      localStorage.removeItem("admin");
                      setAdminLogged(false);
                    }}
                  >
                    Logout
                  </button>
                  <AdminDashboard />
                </div>
              ) : (
                <AdminLogin onLogin={() => setAdminLogged(true)} />
              )
            }
          />

          <Route
            path="/admin/upload"
            element={
              adminLogged ? (
                <div style={{ padding: "20px" }}>
                  <h1>Upload Saree</h1>
                  <AdminUpload />
                </div>
              ) : (
                <AdminLogin onLogin={() => setAdminLogged(true)} />
              )
            }
          />

          <Route
            path="/admin/orders"
            element={
              adminLogged ? (
                <div style={{ padding: "20px" }}>
                  <h1>Orders</h1>
                  <AdminOrders />
                </div>
              ) : (
                <AdminLogin onLogin={() => setAdminLogged(true)} />
              )
            }
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
