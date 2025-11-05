// import React from 'react';
// import './About.css';

// function About() {
//   return (
//     <div className="about">
//       <h2>About Saree Lover</h2>
//       <p>
//         Saree Lover brings you the best sarees from across India — silk, cotton,
//         designer, and more — delivered anywhere in India.
//       </p>
//     </div>
//   );
// }

// export default About;


import React from "react";
import "./About.css";
// import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        {/* <img src={logo} alt="Saree Lover Logo" className="about-logo" /> */}
      <h1 className="logo">Saree Lover</h1>

        <h1>About <span>Saree Lover</span></h1>
        <p>
          Embracing Indian tradition with elegance and grace. We bring you handpicked sarees from across India — for every woman, every occasion.
        </p>
      </section>

      {/* Brand Story */}
      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          Saree Lover was founded with a simple idea — to make traditional Indian sarees accessible to every corner of the nation.
          From the weavers of Kanchipuram to the artisans of Banaras, we work directly with skilled creators to bring you authentic, high-quality sarees.
        </p>
        <p>
          We are passionate about preserving India’s rich handloom heritage while blending it with modern trends. Whether it’s a festive occasion, wedding, or casual wear, Saree Lover celebrates *you* — with love, art, and tradition.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="mission-card">
          <h3>🎯 Our Mission</h3>
          <p>
            To empower artisans and bring authentic sarees from every region of India to your doorstep — with quality and trust.
          </p>
        </div>
        <div className="mission-card">
          <h3>🌸 Our Vision</h3>
          <p>
            To be India’s most loved saree brand by blending traditional craftsmanship with modern style and convenience.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="about-highlights">
        <div className="highlight-card">
          <h4>🧵 100% Handcrafted</h4>
          <p>Each saree is carefully woven by experienced artisans.</p>
        </div>
        <div className="highlight-card">
          <h4>🚚 Pan India Delivery</h4>
          <p>Delivering across all locations in India with love and care.</p>
        </div>
        <div className="highlight-card">
          <h4>💖 Trusted Quality</h4>
          <p>We promise quality, authenticity, and affordable elegance.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
