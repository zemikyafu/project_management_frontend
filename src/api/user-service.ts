import { UUID } from "crypto"
import api from "."

const UserService = {
  async fetchCompanyUsers(companyId: UUID) {
    const response = await api.get(`/users/company/${companyId}`)
    return response.data.data
  },
  async updateUserStatus(id: UUID, status: string) {
    const response = await api.patch(`/users/${id}/status`, { id, status })
    return response.data.data
  }
}
export default UserService
