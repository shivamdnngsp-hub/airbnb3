import axios from "axios";


axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://airbnb-backend-xpor.onrender.com/api",
  withCredentials: true,
});

export default api;
