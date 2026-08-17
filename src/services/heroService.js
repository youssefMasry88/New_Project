import axios from "axios";

const API = "http://localhost:1337/api";

export const getHeroSlides = async () => {
    const res = await axios.get(`${API}/hero-slides?populate=*`);
    return res.data.data;
}