import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToWishlist, getWishlist, removeFromWishlist } from "../wishlist/wishlistService";
import { addToCartAPI } from "../pages/cartService";
import "./SareeCard.css";

function SareeCard({ saree }) {
  const navigate = useNavigate();
  const userId = 1; // demo user
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if this saree is already in wishlist
  useEffect(() => {
    getWishlist(userId)
      .then(res => {
        const wishlistIds = res.data.map(item => item.saree?.id);
        setIsWishlisted(wishlistIds.includes(saree.id));
      })
      .catch(err => console.log(err));
  }, [saree.id]);

  const handleBuyNow = () => {
    navigate("/checkout", { state: { saree } });
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      // Remove from wishlist
      removeFromWishlist(userId, saree.id)
        .then(() => setIsWishlisted(false))
        .catch(err => console.log(err));
    } else {
      // Add to wishlist
      addToWishlist(userId, saree.id)
        .then(() => setIsWishlisted(true))
        .catch(err => console.log(err));
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      userId: userId,
      sareeId: saree.id,
      name: saree.name,
      price: saree.price,
      image: saree.imageUrl,
      quantity: 1,
    };

    addToCartAPI(cartItem)
      .then(() => alert("Added to cart 🛒"))
      .catch(() => alert("Failed to add to cart"));
  };

  return (
    <div className="saree-card">
      <img
        src={saree.imageUrl?.startsWith("http") ? saree.imageUrl : `http://localhost:8080/uploads/${saree.imageUrl}`}
        alt={saree.name}
        className="saree-image"
        onError={(e) => (e.target.src = "https://via.placeholder.com/120x160?text=Saree")}
      />

      <div className="saree-details">
        <h4>{saree.name}</h4>
        <p>₹{saree.price}</p>
        <p>{saree.category}</p>

        <div className="saree-actions">
          <button onClick={handleBuyNow}>Buy Now 🛒</button>

          <button
            className="wishlist-btn"
            onClick={toggleWishlist}
            style={{ color: isWishlisted ? "red" : "gray" }}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>

          <button onClick={handleAddToCart}>Add to Cart 🛒</button>
        </div>
      </div>
    </div>
  );
}

export default SareeCard;
