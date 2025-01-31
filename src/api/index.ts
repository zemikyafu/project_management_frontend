import axios from "axios"
import setupInterceptors from "./interceptors"

const baseURL = import.meta.env.VITE_API_BACKEND_BASE_URL || "http://localhost:1000/api/v1"
const api = axios.create({
  baseURL
})

setupInterceptors(api)

export default api
