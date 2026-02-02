import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5000/api";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Helper to attach token
const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/** ===== AUTH ===== */
export const registerUser = (data) => apiClient.post("/auth/register", data);
export const loginUser = (data) => apiClient.post("/auth/login", data);
export const getMe = (token) => apiClient.get("/users/me", authHeaders(token));

/** ===== POSTS ===== */
export const createPost = (data, token) =>
  apiClient.post("/posts", data, authHeaders(token));

export const getPosts = (token) => apiClient.get("/posts", authHeaders(token));

export const likePost = (postId, token) =>
  apiClient.put(`/posts/${postId}/like`, {}, authHeaders(token));

export const deletePost = (id, token) =>
  apiClient.delete(`/posts/${id}`, authHeaders(token));

/** ===== COMMENTS ===== */
export const getComments = (postId, token) =>
  apiClient.get(`/comments/${postId}`, authHeaders(token));

export const addComment = (postId, text, token) =>
  apiClient.post(`/comments/${postId}`, { text }, authHeaders(token));

/** ===== USERS ===== */
export const followUser = (userId, token) =>
  apiClient.put(`/users/${userId}/follow`, {}, authHeaders(token));

export const unfollowUser = (userId, token) =>
  apiClient.put(`/users/${userId}/unfollow`, {}, authHeaders(token));

export const getUserById = (userId, token) =>
  apiClient.get(`/users/${userId}`, authHeaders(token));
