import axios from "axios";

const CART_API = "http://localhost:8080/api/cart";

export const addToCartAPI = (cartItem) => {
  return axios.post(CART_API, cartItem);
};

export const getCartAPI = (userId) => {
  return axios.get(`${CART_API}/${userId}`);
};

export const removeFromCartAPI = (id) => {
  return axios.delete(`${CART_API}/${id}`);
};
