import axios from "axios";

const API = "http://localhost:1337/api/instagram-posts?populate=*";

export const getInstagramPosts = async () => {
    const res = await axios.get(`${API}`);
    return res.data.data;
}