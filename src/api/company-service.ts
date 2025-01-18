import api from "."
import { UUID } from "crypto"

const company = {
  async createCompany(name: string, email: string, address: string) {
    const response = await api.post("/companies/", { name, email, address })
    return response.data.data
  },
  async getCompanyById(id: UUID) {
    const response = await api.get(`/companies/${id}`)
    return response.data.data
  },
  async fetchUserCompany() {
    const response = await api.get("/companies/")
    return response.data.data
  },
  async updateCompany(id: UUID, name: string, email: string, address: string) {
    const response = await api.patch(`/companies/${id}`, { name, email, address })
    return response.data.data
  }
}
export default company
