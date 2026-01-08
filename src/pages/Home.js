// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';

// function Home() {
//   return (
//     <div className="home">
//       <h2>Welcome to Saree Lover</h2>
//       <p>Discover beautiful sarees from all over India.</p>
//       <Link to="/products" className="btn">Shop Now</Link>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SareeCard from "../components/SareeCard";
import "./Home.css";

// Static images only for hero & categories
import saree1 from "../assets/images/saree1.jpg";
import saree2 from "../assets/images/saree2.jpg";
import saree3 from "../assets/images/saree3.jpg";

const Home = () => {
  const [sarees, setSarees] = useState([]);

  // 🔗 Load sarees from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/sarees")
      .then((res) => res.json())
      .then((data) => {
        // ✅ IMPORTANT: SAME FIX AS PRODUCTS PAGE
        const updatedData = data.map((saree) => ({
          ...saree,
          imageUrl: `http://localhost:8080/uploads/${saree.imageUrl}`,
        }));

        setSarees(updatedData);
      })
      .catch((err) => console.error("Error loading sarees:", err));
  }, []);

  // Show only first 3
  const featuredSarees = sarees.slice(0, 3);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Welcome to <span>Saree Lover</span>
          </h1>
          <p>
            Discover the elegance of Indian tradition. Handcrafted sarees from
            the finest weavers across India — delivered to your doorstep.
            <br />
            <br />
            Every saree tells a story — and we are here to help you find yours.
          </p>

          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>
        </div>

        <div className="hero-image">
          <img src={saree1} alt="Beautiful Saree" />
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <h2>Explore by Category</h2>

        <div className="categories">
          <div className="category-card">
            <img src={saree2} alt="Silk Saree" />
            <p>Silk Sarees</p>
          </div>

          <div className="category-card">
            <img src={saree3} alt="Cotton Saree" />
            <p>Cotton Sarees</p>
          </div>

          <div className="category-card">
            <img src={saree1} alt="Designer Saree" />
            <p>Designer Sarees</p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-section">
        <h2>Featured Collections</h2>

        <div className="featured-grid">
          {featuredSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>

        <Link to="/products" className="view-all-btn">
          View All Products
        </Link>
      </section>

      {/* WHY CHOOSE US */}
      <section className="delivery-section">
        <h2>Why Choose Saree Lover?</h2>

        <div className="delivery-highlights">
          <div className="delivery-card">
            <h3>🚚 Fast Pan-India Delivery</h3>
            <p>We deliver your favorite sarees safely across India.</p>
          </div>

          <div className="delivery-card">
            <h3>🧵 Handcrafted Elegance</h3>
            <p>Authentic sarees woven by skilled artisans.</p>
          </div>

          <div className="delivery-card">
            <h3>💖 Trusted by Thousands</h3>
            <p>Join our family of happy saree lovers!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
