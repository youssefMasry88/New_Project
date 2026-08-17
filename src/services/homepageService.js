import axios from "axios";

const API = "http://localhost:1337/api";

export const getHomepage = async () => {
    const res = await axios.get(`${API}/homepage`);
    return res.data.data;
};