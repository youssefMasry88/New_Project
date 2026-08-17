import axios from "axios";

const API = "http://localhost:1337/api/auth";
export const register = async (data) => {
    const res = await axios.post(`${API}/local/register`, data);
    return res.data;
}

export const login = async (data) => {
    const res = await axios.post(`${API}/local`, data);
    return res.data;
}