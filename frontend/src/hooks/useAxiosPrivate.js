import { PRODUCTION_API } from "@/utils/constant";
import axios from "axios";

// Create an Axios instance for private requests (with credentials)
const axiosPrivate = axios.create({
    baseURL: PRODUCTION_API, // Your API base URL
    withCredentials: true, // Always include cookies in requests
});

// Request Interceptor
axiosPrivate.interceptors.request.use(
    (config) => {
        // Optionally, you can get the token from cookies here and add it to headers
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

        if (token) {
            config.headers['Authorization'] = `Bearer ${token.split('=')[1]}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosPrivate.interceptors.response.use(
    (response) => {
        // If everything is fine, return the response
        return response;
    },
    async (error) => {
        // Check for 401 (unauthorized) to handle token expiration
        if (error.response && error.response.status === 401) {
            // Handle unauthorized (token expired or invalid)
            // You could redirect to login page or refresh the token here
            // Example:
            // window.location.href = "/login"; 
            // Or if you have a refresh token mechanism, you can implement it here

            // Optional: Refresh token logic could be added here

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosPrivate;
