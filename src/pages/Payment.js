import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { saree, customer } = location.state || {};

  const [method, setMethod] = useState("");

  const handlePayment = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    navigate("/success", {
      state: {
        saree,
        customer,
        paymentMethod: method
      }
    });
  };

  if (!saree) {
    return <h2 style={{ textAlign: "center" }}>No Payment Details Found</h2>;
  }

  return (
    <div className="payment-container">
      <h1>Choose Payment Method</h1>

      <div className="payment-card">
        <div className="payment-left">
          <img
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

        <div className="payment-right">
          <h3>Select Method</h3>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setMethod(e.target.value)}
            />
            💳 UPI (Google Pay, PhonePe, Paytm)
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) => setMethod(e.target.value)}
            />
            💳 Credit / Debit Card
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="COD"
              onChange={(e) => setMethod(e.target.value)}
            />
            💵 Cash on Delivery
          </label>

          <button className="pay-btn" onClick={handlePayment}>
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
