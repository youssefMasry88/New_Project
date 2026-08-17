import axios from "axios";

const API_URL = "http://localhost:1337/api/offer-sections?populate=*";

export const getOffers = async () => {
    const res = await axios.get(API_URL);
    return res.data.data;
};