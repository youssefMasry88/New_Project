import axios from "axios";
import { API_URL } from "./api";

export const getInstagramPosts = async () => {
    const res = await axios.get(`${API_URL}/instagram-posts?populate=*`);
    return res.data.data;
}
