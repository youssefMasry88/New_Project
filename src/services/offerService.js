import axios from "axios";
import { API_URL } from "./api";

export const getOffers = async () => {
    const res = await axios.get(`${API_URL}/offer-sections?populate=*`);
    return res.data.data;
};
