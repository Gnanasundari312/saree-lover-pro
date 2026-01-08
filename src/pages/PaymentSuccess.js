import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { saree, paymentMethod } = location.state || {};

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Payment Successful!</h1>

        <p>Thank you for shopping with <strong>Saree Lover</strong>.</p>

        {saree && (
          <div className="order-details">
            <h3>Order Details</h3>
            <p><strong>Saree:</strong> {saree.name}</p>
            <p><strong>Amount Paid:</strong> ₹{saree.price}</p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
          </div>
        )}

        <button className="home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
