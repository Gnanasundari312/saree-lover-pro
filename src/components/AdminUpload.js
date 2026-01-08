import React, { useState, useEffect } from "react";
import "./AdminUpload.css";

export default function AdminUpload() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: null
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const loadItems = async () => {
    const res = await fetch("http://localhost:8080/api/admins");
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("image", form.image);

    await fetch("http://localhost:8080/api/admins/add", {
      method: "POST",
      body: formData
    });

    alert("Uploaded successfully!");
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="upload-container">
      <h2 className="upload-title">Add Saree</h2>

      <form onSubmit={handleSubmit} className="form-group">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input type="file" onChange={handleFile} required />

        <button type="submit" className="save-btn">
          Save
        </button>
      </form>

      <div className="uploaded-box">
        <h3>Uploaded Items</h3>

        {items.map((item) => (
          <div key={item.id} className="upload-item">
            <p>
              <b>{item.name}</b> — {item.category} — ₹{item.price}
            </p>

            {/* ✅ FIXED IMAGE LOGIC */}
            <img
              src={
                item.imagePath?.startsWith("http")
                  ? item.imagePath
                  : `http://localhost:8080${item.imagePath}`
              }
              alt={item.name}
              width={120}
              style={{ borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
