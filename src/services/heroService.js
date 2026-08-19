import axios from "axios";

const API = "https://homey-strapi.onrender.com/api";

export const getHeroSlides = async () => {
    const res = await axios.get(`${API}/hero-slides?populate=*`);
    return res.data.data;
}