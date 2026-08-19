import axios from "axios";

const API = "https://homey-strapi.onrender.com";

export const getCategories = async () => {
    const res = await axios.get(`${API}/api/categories?populate=*`);
    return res.data.data.map((item) => ({
        id: item.id,
        name: item.name
    }));
};