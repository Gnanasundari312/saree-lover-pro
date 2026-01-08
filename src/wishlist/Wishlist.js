import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "./wishlistService";
import { addToCartAPI } from "../pages/cartService";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const userId = 1; // demo user

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(userId)
      .then((res) => {
        console.log("Wishlist response:", res.data);
        setWishlist(res.data);
      })
      .catch((err) => console.log("Error loading wishlist:", err));
  };

  // Remove item from wishlist and reload
  const handleRemove = (sareeId) => {
    removeFromWishlist(userId, sareeId)
      .then(() => loadWishlist())
      .catch((err) => console.log("Error removing from wishlist:", err));
  };

  // Add to cart
  const handleAddToCart = (saree) => {
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
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 && (
        <div className="empty">
          ❤️ Your wishlist is empty — add something you love!
        </div>
      )}

      {wishlist.map((item) => {
        const saree = item.saree;

        return (
          <div className="wishlist-item" key={item.id}>
            {/* Image with safe URL and placeholder */}
            <img
              src={
                saree?.imageUrl?.startsWith("http")
                  ? saree.imageUrl
                  : `http://localhost:8080/uploads/${saree?.imageUrl}`
              }
              alt={saree?.name || "Saree"}
              className="wishlist-image"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/120x160?text=Saree")
              }
            />

            <div className="wishlist-details">
              <h4>{saree?.name || "Unknown Saree"}</h4>
              <p>₹{saree?.price ?? "--"}</p>
              <p>{saree?.category ?? ""}</p>

              <div className="wishlist-actions">
                <button onClick={() => handleRemove(saree.id)}>Remove ❌</button>
                <button
                  className="wishlist-cart"
                  onClick={() => handleAddToCart(saree)}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Wishlist;
