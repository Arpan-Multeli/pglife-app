// src/utils/auth.js

export const saveAuth = (data) => {
  // data: { token, email, userId }
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("userId", String(data.userId));
};

export const getToken = () => localStorage.getItem("token");

export const getLoggedInUser = () => {
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  if (!email || !userId) return null;

  return { email, id: Number(userId) }; // ✅ return id
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};