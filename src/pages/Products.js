import React, { useState, useEffect } from "react";
import SareeCard from "../components/SareeCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import "./Products.css";

function Products() {
  const [sarees, setSarees] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // ✅ CONNECT FRONTEND → BACKEND
  useEffect(() => {
    fetch("http://localhost:8080/api/sarees")
      .then((res) => res.json())
      .then((data) => {
        // ⭐ VERY IMPORTANT FIX
        const updatedData = data.map((saree) => ({
          ...saree,
          imageUrl: `http://localhost:8080/uploads/${saree.imageUrl}`
        }));

        setSarees(updatedData);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredSarees = sarees.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? s.category === category : true)
  );

  return (
    <div className="products">
      <h2>Our Saree Collections</h2>

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <Filter category={category} setCategory={setCategory} />
      </div>

      <div className="saree-list">
        {filteredSarees.map((saree) => (
          <SareeCard key={saree.id} saree={saree} />
        ))}
      </div>
    </div>
  );
}

export default Products;
