import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await fetch("http://localhost:8080/api/order");
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8080/api/order/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status)
    });

    load(); // refresh orders
  };

  useEffect(() => {
    load(); // ✅ call async function safely
  }, []);

  return (
    <div>
      <h2>Manage Orders</h2>

      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p>
            <b>Order #{o.id}</b> — {o.customerName}
          </p>

          <p>
            Status: <b>{o.status}</b>
          </p>

          <select
            value={o.status}
            onChange={(e) => updateStatus(o.id, e.target.value)}
          >
            <option>Ordered</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}
