import api from "."
import { UUID } from "crypto"

const Authservice = {
  async login(email: string, password: string) {
    console.log("email", email)
    const response = await api.post("/auth/signin", { email, password })
    console.log("response", response)
    return response.data.data
  },

  async register(name: string, email: string, password: string) {
    const response = await api.post("/auth/signup", { name, email, password })
    return response.data.data
  },

  async getUserProfile(userId: UUID) {
    const response = await api.get(`/users/${userId}`)
    return response.data.data
  },

  async updateProfile(userId: UUID, name: string, email: string) {
    const token = localStorage.getItem("token")
    const response = await api.patch(`/users/${userId}`, { name, email })
    return response.data.data
  },

  async completeOnBoarding(invitationId: UUID, name: string, password: string) {
    const response = await api.post(`/auth/on-boarding/${invitationId}`, { name, password })
    return response.data.data
  }
}

export default Authservice
