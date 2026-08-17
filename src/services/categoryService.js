import axios from "axios";

const API = "http://localhost:1337";

export const getCategories = async () => {
    const res = await axios.get(`${API}/api/categories?populate=*`);
    return res.data.data.map((item) => ({
        id: item.id,
        name: item.name
    }));
};