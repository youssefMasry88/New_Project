import axios from "axios";
import { API_URL } from "./api";

export const getHeroSlides = async () => {
    const res = await axios.get(`${API_URL}/hero-slides?populate=*`);
    return res.data.data;
}
