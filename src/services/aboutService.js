import axios from "axios";
import { API_URL } from "./api";

export const getAbout = async () => {
const res = await axios.get(`${API_URL}/abouts?populate=*`);


return res.data.data[0];
}
