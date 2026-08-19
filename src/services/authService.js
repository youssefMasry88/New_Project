import axios from "axios";

const API = "https://homey-strapi.onrender.com/api/auth";
export const register = async (data) => {
    const res = await axios.post(`${API}/local/register`, data);
    return res.data;
}

export const login = async (data) => {
    const res = await axios.post(`${API}/local`, data);
    return res.data;
}