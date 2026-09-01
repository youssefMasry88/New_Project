import axios from "axios";
import { API_URL } from "./api";

export const getBrandVideo = async () => {
    const res = await axios.get(`${API_URL}/brand-video?populate=*`);
    
    return res.data.data;
};
