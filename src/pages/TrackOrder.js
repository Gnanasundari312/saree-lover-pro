import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TrackOrder.css";

export default function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        const res = await fetch(`http://localhost:8080/api/order/${id}`);

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrder();
  }, [id]);

  if (notFound)
    return <h2 style={{ textAlign: "center" }}>❌ Order not found</h2>;

  if (!order)
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  const steps = ["Ordered", "Packed", "Shipped", "Out for Delivery", "Delivered"];
  const currentIndex = steps.indexOf(order.status);

  /* DELIVERY DATE (orderDate + 5 days) */
  const orderDate = order.orderDate ? new Date(order.orderDate) : new Date();
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 5);

  return (
    <div className="track-container">
      <h2>Track Order #{order.id}</h2>

      {/* ORDER SUMMARY */}
      <div className="order-summary">
        <div className="order-info">
          <div>
            <span className="label">Customer</span>
            <span className="value">{order.customerName}</span>
          </div>

          <div>
            <span className="label">Current Status</span>
            <span className="status-pill">{order.status}</span>
          </div>

          <div>
            <span className="label">Estimated Delivery</span>
            <span className="delivery-date">{deliveryDate.toDateString()}</span>
          </div>
        </div>
      </div>

      {/* TRACKING TIMELINE */}
      <div className="timeline">
        {steps.map((step, index) => (
          <div key={step} className="timeline-step">
            <div className={`circle ${index <= currentIndex ? "active" : ""}`}>
              {index < currentIndex ? "✓" : index + 1}
            </div>
            <span className={`step-label ${index <= currentIndex ? "active-text" : ""}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
