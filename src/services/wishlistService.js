  import axios from "axios";

  const API = "https://homey-strapi.onrender.com";

  const getToken = () => {
    return localStorage.getItem("token");
  };

  export const getMyWishlist = async () => {
    const token = getToken();

    if (!token) {
      throw new Error("User is not logged in");
    }

    const res = await axios.get(`${API}/api/wishlist/me`, {
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
    `${API}/api/wishlist/toggle`,
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