import { AxiosInstance } from "axios"

const PUBLIC_URL = ["/auth/signin", "/auth/signup", "/on-boarding"]

const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      if (PUBLIC_URL.includes(config.url || "")) {
        return config
      }
      const token = localStorage.getItem("token")
      if (!token) {
        return Promise.reject(new Error("Authentication token is missing. Please log in."))
      }

      config.headers.Authorization = `Bearer ${token}`

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    (response) => {
      if (response.data.status === "error") {
        throw new Error(
          response.data.errors?.map((e: { message: any }) => e.message).join(", ") ||
            "An unknown error occurred"
        )
      }
      return response
    },
    (error) => {
      const message =
        error.response?.data?.errors?.map((e: { message: any }) => e.message).join(", ") ||
        "No response received from the server"
      throw new Error(message)
    }
  )
}

export default setupInterceptors
