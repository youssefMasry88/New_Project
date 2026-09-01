import axios from "axios";
import { API_URL } from "./api";

export const getHomepage = async () => {
    const res = await axios.get(`${API_URL}/homepage`);
    return res.data.data;
};
