import { useEffect, useState } from "react";
import { getCartAPI, removeFromCartAPI } from "./cartService";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const userId = 1; // demo user

  const loadCart = () => {
    getCartAPI(userId)
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <img
            src={`http://localhost:8080/uploads/${item.image}`}
            alt={item.name}
            width="120"
          />

          <h4>{item.name}</h4>
          <p>₹{item.price}</p>

          <button
            onClick={() => {
              removeFromCartAPI(item.id).then(() => loadCart());
            }}
          >
            Remove ❌
          </button>
        </div>
      ))}
    </div>
  );
}
