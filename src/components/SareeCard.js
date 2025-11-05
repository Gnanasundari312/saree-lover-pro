import React from 'react';
import './SareeCard.css';

function SareeCard({ saree }) {
  return (
    <div className="saree-card">
      <img src={saree.image} alt={saree.name} />
      <h3>{saree.name}</h3>
      <p>Category: {saree.category}</p>
      <p>₹{saree.price}</p>
      <button className="btn">Buy Now</button>
    </div>
  );
}

export default SareeCard;
