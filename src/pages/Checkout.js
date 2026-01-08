import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Checkout.css";

export default function Checkout() {
  const { user, selectAddress } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const saree = state?.saree;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (addr, index) => {
    setSelectedIndex(index);
    selectAddress(addr);
  };

  const handlePlaceOrder = async () => {
    if (!user?.selectedAddress) {
      alert("Please select an address first.");
      return;
    }

    const orderData = {
      sareeId: saree.id,
      sareeName: saree.name,
      price: saree.price,
      customerName: user.selectedAddress.name,
      phone: user.selectedAddress.phone,
      address: `${user.selectedAddress.street}, ${user.selectedAddress.city}`,
      pincode: user.selectedAddress.pincode
    };

    try {
      const response = await fetch("http://localhost:8080/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const savedOrder = await response.json();

      navigate("/order-summary", {
        state: { saree, customer: user.selectedAddress, order: savedOrder }
      });
    } catch (err) {
      alert("Something went wrong while placing the order.");
      console.error(err);
    }
  };

  if (!saree) {
    return <p>Loading...</p>;
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-card">
        <div className="checkout-image">
          <img
            src={saree.imageUrl}
            alt={saree.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/200x280?text=Saree";
            }}
          />
        </div>

        <div className="checkout-info">
          <h3>{saree.name}</h3>
          <p className="price">Price: ₹{saree.price}</p>

          <h3>📍 Choose Delivery Address</h3>

          {(!user || (user.addresses || []).length === 0) && (
            <p style={{ color: "gray" }}>
              No saved addresses. Please add one in your Profile page.
            </p>
          )}

          {(user?.addresses || []).map((addr, i) => (
            <div
              key={i}
              style={{
                border:
                  selectedIndex === i
                    ? "2px solid #ff2f75"
                    : "1px solid #ddd",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            >
              <label style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  name="address"
                  checked={selectedIndex === i}
                  onChange={() => handleSelect(addr, i)}
                />
                <strong style={{ marginLeft: "8px" }}>{addr.name}</strong>
              </label>

              <p>{addr.phone}</p>
              <p>{addr.street}</p>
              <p>
                {addr.city}, {addr.pincode}
              </p>
            </div>
          ))}

          <button
            className="checkout-btn"
            disabled={selectedIndex === null}
            style={{
              background:
                selectedIndex === null ? "#ccc" : "#ff2f75",
              cursor:
                selectedIndex === null ? "not-allowed" : "pointer"
            }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
