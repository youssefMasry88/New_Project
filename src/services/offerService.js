import axios from "axios";

const API_URL = "https://homey-strapi.onrender.com/api/offer-sections?populate=*";

export const getOffers = async () => {
    const res = await axios.get(API_URL);
    return res.data.data;
};