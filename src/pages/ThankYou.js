import React from "react";
import { Link } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h1>🎉 Thank You!</h1>
        <p>
          Your message has been sent successfully.  
          Our Saree Lover support team will get back to you shortly.
        </p>

        <Link to="/" className="home-btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
