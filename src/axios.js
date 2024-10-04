import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:3001"
    baseURL: "https://event-back-production.up.railway.app"
    // baseURL: "https://event-back-two.vercel.app"
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
})

export default instance; 