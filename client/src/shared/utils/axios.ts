import axios from "axios";

const $Api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
});

$Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$Api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && originalRequest._isRetry === false) {
            originalRequest._isRetry = true;
        }
        return Promise.reject(error);
    },
);

export default $Api;
