import axios from "axios";
import { API_URL } from "./api";

export const createOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API_URL}/orders`,
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
    `${API_URL}/orders/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.data;
};
