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


import React from "react";
import { Link } from "react-router-dom";
import sarees from "../data/sarees";
import SareeCard from "../components/SareeCard";
import "./Home.css";
import heroImage from "../assets/images/saree1.jpg";

const Home = () => {
  // Display only first 3 sarees as featured
  const featuredSarees = sarees.slice(0, 3);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Welcome to <span>Saree Lover</span>
          </h1>
          <p>
            Discover the elegance of Indian tradition. Handcrafted sarees from the finest weavers across India — delivered to your doorstep.
          </p>
          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Beautiful Saree" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Explore by Category</h2>
        <div className="categories">
          <div className="category-card">
            <img src={require("../assets/images/saree2.jpg")} alt="Silk Saree" />
            <p>Silk Sarees</p>
          </div>
          <div className="category-card">
            <img src={require("../assets/images/saree3.jpg")} alt="Cotton Saree" />
            <p>Cotton Sarees</p>
          </div>
          <div className="category-card">
            <img src={require("../assets/images/saree1.jpg")} alt="Designer Saree" />
            <p>Designer Sarees</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
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

      {/* Delivery Info */}
      <section className="delivery-section">
        <h2>Why Choose Saree Lover?</h2>
        <div className="delivery-highlights">
          <div className="delivery-card">
            <h3>🚚 Fast Pan-India Delivery</h3>
            <p>We deliver your favorite sarees safely and quickly across India.</p>
          </div>
          <div className="delivery-card">
            <h3>🧵 Handcrafted Elegance</h3>
            <p>Authentic sarees woven by skilled artisans from different regions.</p>
          </div>
          <div className="delivery-card">
            <h3>💖 Trusted by Thousands</h3>
            <p>Join our family of happy saree lovers across the country!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
