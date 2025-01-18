import axios from "axios";
import setupInterceptors from "./interceptors";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api/v1';
const api = axios.create({
    baseURL
  });

  setupInterceptors(api);
  
  export default api;