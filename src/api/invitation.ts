import { InvitationCreateFormValues } from "@/schemas/invitation"
import api from "."

const InvitationService = {
  async getAllInvitation() {
    const response = await api.get(`/invitations`)
    return response.data.data
  },
  async createInvitation(invitationData: InvitationCreateFormValues) {
    const response = await api.post(`/invitations`, invitationData)
    return response.data.data
  }
}
export default InvitationService
