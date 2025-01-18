import api from "."
import { UUID } from "crypto"
import { WorkspaceCreateFormValues, WorkspaceUpdateFormValue } from "../schemas/workspace"

const WorkspaceService = {
  async fetchCompanyWorkspaces(companyId: UUID) {
    const response = await api.get(`/companies/${companyId}/workspaces/`)
    return response.data.data
  },

  async fetchWorkspaceById(workspaceId: UUID, companyId: UUID) {
    const response = await api.get(`/companies/${companyId}/workspaces/${workspaceId}`)
    return response.data.data
  },
  async createWorkspace(workspaceData: WorkspaceCreateFormValues, companyId: UUID) {
    const response = await api.post(`/companies/${companyId}/workspaces/`, workspaceData)
    return response.data.data
  },
  async updateWorkspace(workspaceData: WorkspaceUpdateFormValue, companyId: UUID) {
    const response = await api.put(
      `/companies/${companyId}/workspaces/${workspaceData.id}`,
      workspaceData
    )
    return response.data.data
  }
}

export default WorkspaceService
