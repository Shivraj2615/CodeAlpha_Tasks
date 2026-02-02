import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ---------- PRODUCT ----------
export const fetchProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/${id}`);

// ---------- AUTH ----------
export const registerUser = (userData) => API.post("/auth/register", userData);

export const loginUser = (userData) => API.post("/auth/login", userData);

// ---------- ORDERS (later) ----------
export const createOrder = (orderData, token) =>
  API.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchMyOrders = (token) =>
  API.get("/orders/myorders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default API;
