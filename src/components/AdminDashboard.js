import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: ""
  });

  const load = async () => {
    const res = await fetch("http://localhost:8080/api/admins");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteItem = async (id) => {
    await fetch(`http://localhost:8080/api/admins/delete/${id}`, {
      method: "DELETE"
    });
    load();
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price
    });
  };

  const saveEdit = async (id) => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("category", editForm.category);
    formData.append("price", editForm.price);

    await fetch(`http://localhost:8080/api/admins/update/${id}`, {
      method: "PUT",
      body: formData
    });

    setEditing(null);
    load();
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* ⭐ NEW BUTTON */}
      <div style={{ marginBottom: "15px" }}>
        <Link to="/admin/orders" className="btn btn-save">
          📦 Manage Orders
        </Link>
      </div>

      {items.map((item) => (
        <div key={item.id} className="item-card">
          {editing === item.id ? (
            <>
              <div className="edit-inputs">
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />

                <input
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                />

                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                />
              </div>

              <div className="buttons">
                <button className="btn btn-save" onClick={() => saveEdit(item.id)}>
                  Save
                </button>

                <button className="btn btn-cancel" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src={item.imagePath}
                alt={item.name}
                width={120}
                style={{ borderRadius: "10px" }}
              />

              <div className="item-info">
                <p>
                  <b>{item.name}</b> — {item.category} — ₹{item.price}
                </p>
              </div>

              <div className="buttons">
                <button className="btn btn-edit" onClick={() => startEdit(item)}>
                  Edit
                </button>

                <button className="btn btn-delete" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
