import axios from "axios";

const API = "https://homey-strapi.onrender.com/api/instagram-posts?populate=*";

export const getInstagramPosts = async () => {
    const res = await axios.get(`${API}`);
    return res.data.data;
}