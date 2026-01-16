import axios from "axios";

const api = axios.create({
    baseURL: "https://airbnb-backend-xpor.onrender.com",
    withCredentials: true
})



export default api;
