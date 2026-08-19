import axios from "axios";

const API = "https://homey-strapi.onrender.com/api";

export const getHomepage = async () => {
    const res = await axios.get(`${API}/homepage`);
    return res.data.data;
};