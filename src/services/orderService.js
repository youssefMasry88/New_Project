import axios from "axios";

const API = "http://localhost:1337";

export const createOrder = async (orderData) =>{
    const token = localStorage.getItem("token");

    const res = await axios.post(
        `${API}/api/orders`,
        {
            data: orderData,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}

export const getMyOrders = async ()=> {
    const token = localStorage.getItem("token");

    const res = await axios.get(
        `${API}/api/orders?populate=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data.data;
}
