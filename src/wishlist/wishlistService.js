import axios from "axios";

const API_URL = "http://localhost:8080/api/wishlist";

// ✅ Add product to wishlist
// Backend saves userId + sareeId
export const addToWishlist = (userId, sareeId) => {
  return axios.post(`${API_URL}/${userId}/add/${sareeId}`);
};

// ✅ Get wishlist with FULL saree details
// Backend must return: wishlist + saree object
export const getWishlist = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

// ✅ Remove product from wishlist
export const removeFromWishlist = (userId, sareeId) => {
  return axios.delete(`${API_URL}/${userId}/remove/${sareeId}`);
};
