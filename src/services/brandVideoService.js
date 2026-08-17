import axios from "axios";

const API = "http://localhost:1337/api";

export const getBrandVideo = async () => {
    const res = await axios.get(`${API}/brand-video?populate=*`);
    
    return res.data.data;
};