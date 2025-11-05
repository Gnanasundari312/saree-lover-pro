// import React from 'react';
// import './Contact.css';

// function Contact() {
//   return (
//     <div className="contact">
//       <h2>Contact Us</h2>
//       <p>Email: support@sareelover.in</p>
//       <p>Phone: +91 98765 43210</p>
//     </div>
//   );
// }

// export default Contact;


import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting Saree Lover! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      {/* Header */}
      <section className="contact-header">
        <h1>Contact <span>Saree Lover</span></h1>
        <p>
          We’d love to hear from you! Whether you have a question about our sarees,
          orders, or anything else — our team is ready to help.
        </p>
      </section>

      {/* Main Content */}
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Reach Us</h2>
          <p><strong>📍 Address:</strong> Saree Lover, Kaliyanoor Village, Kanchipuram, Tamil Nadu, India</p>
          <p><strong>📞 Phone:</strong> +91 9789547223</p>
          <p><strong>📧 Email:</strong> supportgs@sareelover.in</p>
          <p><strong>🕐 Timings:</strong> Mon - Sat | 9:00 AM - 7:00 PM</p>

          <div className="map-container">
            <iframe
              title="Saree Lover Location"
              src="https://www.google.com/maps/embed?pb=!3m1!4b1!4m6!3m5!1s0x3a52e83f3a80e8eb:0x9ff58fce9d1c06f2!8m2!3d12.8296855!4d79.7601346!16s%2Fg%2F12hmn9fnx?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
