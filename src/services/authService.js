import axios from "axios";
import { API_URL } from "./api";

const API = `${API_URL}/auth`;

// =========================
// REGISTER
// =========================
export const register = async (data) => {
  const res = await axios.post(`${API}/local/register`, data);

  // Save JWT
  if (res.data?.jwt) {
    localStorage.setItem("token", res.data.jwt);
  }

  // Save user
  if (res.data?.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data;
};

// =========================
// LOGIN
// =========================
export const login = async (data) => {
  const res = await axios.post(`${API}/local`, data);

  // Save JWT
  if (res.data?.jwt) {
    localStorage.setItem("token", res.data.jwt);
  }

  // Save user
  if (res.data?.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data;
};

// =========================
// LOGOUT
// =========================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
