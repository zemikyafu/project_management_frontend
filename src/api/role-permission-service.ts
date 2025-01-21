import { RoleCreateFormValues, RolePermissionFormValues } from "@/schemas/role-permission"
import api from "."
import { UUID } from "crypto"

const RolePermissionService = {
  async getRoles(companyId: UUID) {
    const response = await api.get(`/roles/companyId/${companyId}`)
    return response.data.data
  },

  async getPermissions() {
    const response = await api.get("/permissions")
    return response.data.data
  },

  async getRolePermissions(companyId: UUID) {
    const response = await api.get(`/company/${companyId}/roles_permissions`)
    return response.data.data
  },
  async createRole(roleData: RoleCreateFormValues) {
    const response = await api.post("/roles", roleData)
    response.data.data
  },
  async deleteRolePermission(rolePermissionData: RolePermissionFormValues) {
    const response = await api.delete(
      `/roles/${rolePermissionData.roleId}/permissions/${rolePermissionData.permissionId}`
    )
    return response.data.data
  },
  async createRolePermission(rolePermissionData: RolePermissionFormValues) {
    const response = await api.post(
      `/roles/${rolePermissionData.roleId}/permissions`,
      rolePermissionData
    )
    return response.data.data
  }
}

export default RolePermissionService
