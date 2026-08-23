import axios from "axios";

const API = "https://homey-strapi.onrender.com";

export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/api/orders`,
    {
      data: orderData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/api/orders/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.data;
};