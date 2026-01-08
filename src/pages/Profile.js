import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new address
  const addAddress = () => {
    const updated = [...(user.addresses || []), form];
    updateUser({ addresses: updated });
    setForm({ name: "", phone: "", street: "", city: "", pincode: "" });
  };

  // Save edited address
  const saveEdit = () => {
    const updated = [...user.addresses];
    updated[editingIndex] = form;
    updateUser({ addresses: updated });
    setEditingIndex(null);
  };

  // Delete address
  const deleteAddress = (index) => {
    const updated = user.addresses.filter((_, i) => i !== index);
    updateUser({ addresses: updated });
  };

  const handleLogout = () => {
    logout();        // clear auth state
    navigate("/");   // redirect to home
  };

  if (!user) return null; // avoid rendering before redirect

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            className="profile-avatar"
            alt="user"
          />
          <h2>User Profile</h2>
          <p className="profile-tagline">{user.email}</p>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>

        <h3>📍 Saved Addresses</h3>

        {(user.addresses || []).map((addr, i) => (
          <div key={i} className="address-box">
            {editingIndex === i ? (
              <>
                <input className="profile-input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
                <input className="profile-input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                <input className="profile-input" name="street" placeholder="Street" value={form.street} onChange={handleChange} />
                <input className="profile-input" name="city" placeholder="City" value={form.city} onChange={handleChange} />
                <input className="profile-input" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />

                <div className="address-actions">
                  <button className="btn-edit" onClick={saveEdit}>Save</button>
                  <button className="btn-security" onClick={() => setEditingIndex(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p><b>{addr.name}</b> — {addr.phone}</p>
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.pincode}</p>

                <div className="address-actions">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setEditingIndex(i);
                      setForm(addr);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-security"
                    onClick={() => deleteAddress(i)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        <h3 style={{ marginTop: "15px" }}>➕ Add New Address</h3>

        <div className="address-box">
          <input className="profile-input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input className="profile-input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input className="profile-input" name="street" placeholder="Street / Area" value={form.street} onChange={handleChange} />
          <input className="profile-input" name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <input className="profile-input" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />

          <button className="btn-edit" onClick={addAddress}>
            Save Address
          </button>
        </div>

      </div>
    </div>
  );
}
