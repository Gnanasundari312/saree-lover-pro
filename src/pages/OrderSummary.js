import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./OrderSummary.css";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { saree, customer, order } = location.state || {};

  if (!saree) {
    return (
      <div className="summary-container">
        <h2>No Order Details Found</h2>
        <p>Please go back and select a saree.</p>
      </div>
    );
  }

  const delivery = user?.selectedAddress || customer || {};

  const orderId = order?.id || "TEMP-" + Math.floor(Math.random() * 100000);
  const orderDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : new Date().toLocaleString();

  const handlePayment = () => {
    navigate("/payment", { state: { saree, customer: delivery, order } });
  };

  return (
    <div className="summary-container">
      <h1>Order Summary</h1>

      <div className="order-meta">
        <div className="order-row">
          <span className="label">Order ID</span>
          <span className="value">#{orderId}</span>
        </div>

        <div className="order-row">
          <span className="label">Order Date</span>
          <span className="value">{orderDate}</span>
        </div>
      </div>

      <div className="summary-card">
        {/* Product Section */}
        <div className="summary-left">
          <img
            className="summary-image"
            src={saree.imageUrl}
            alt={saree.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/200x280?text=Saree";
            }}
          />
          <h2>{saree.name}</h2>
          <p className="price">₹{saree.price}</p>
        </div>

        {/* Delivery Details */}
        <div className="summary-right">
          <h3>Delivery Details</h3>

          <div className="delivery-row">
            <strong>Name:</strong>
            <span>{delivery.name}</span>
          </div>

          <div className="delivery-row">
            <strong>Phone:</strong>
            <span>{delivery.phone}</span>
          </div>

          <div className="delivery-row">
            <strong>Address:</strong>
            <span>{delivery.address || delivery.street}</span>
          </div>

          <div className="delivery-row">
            <strong>City:</strong>
            <span>{delivery.city}</span>
          </div>

          <div className="delivery-row">
            <strong>Pincode:</strong>
            <span>{delivery.pincode}</span>
          </div>

          <button className="payment-btn" onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
