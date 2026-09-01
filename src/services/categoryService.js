import axios from "axios";
import { API_URL } from "./api";

export const getCategories = async () => {
    const res = await axios.get(`${API_URL}/categories?populate=*`);
    return res.data.data.map((item) => ({
        id: item.id,
        name: item.name
    }));
};
