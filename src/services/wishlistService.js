import axios from "axios";
import { API_URL } from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getMyWishlist = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("User is not logged in");
  }

  const res = await axios.get(`${API_URL}/wishlist/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const toggleWishlist = async (productId) => {
  const token = getToken();

  if (!token) {
    throw new Error("User is not logged in");
  }

  const res = await axios.post(
    `${API_URL}/wishlist/toggle`,
    {
      productId: String(productId),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
