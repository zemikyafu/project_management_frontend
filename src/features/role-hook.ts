import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"

interface Permission {
  id: UUID
  name: string
  // Add other properties as needed
}
import RolePermissionService from "../api/role-permission-service"
import Company from "@/pages/company"
import { getCompanyById } from "@/api/company-service"
import { UUID } from "crypto"

const QUERY_KEY_ROLE = "roles"
const QUERY_KEY_PERMISSION = "permissions"
const QUERY_KEY_ROLE_PERMISSION = "role_permissions"

export function roleKey(id?: string) {
  if (id) {
    return [QUERY_KEY_ROLE, id]
  }

  return [QUERY_KEY_ROLE]
}
export function permissionKey(id?: string) {
  if (id) {
    return [QUERY_KEY_PERMISSION, id]
  }

  return [QUERY_KEY_PERMISSION]
}

export function rolePermissionKey(id?: string) {
  if (id) {
    return [QUERY_KEY_ROLE_PERMISSION, id]
  }

  return [QUERY_KEY_ROLE_PERMISSION]
}

export function useFetchRoles(companyId: UUID) {
  const { data, error, isLoading } = useQuery({
    queryKey: roleKey(companyId),
    queryFn: () => RolePermissionService.getRoles(companyId),
    staleTime: Infinity
  })

  return {
    roles: data,
    error,
    isLoading
  }
}

export function useFetchPermissions() {
  const { data, error, isPending } = useQuery({
    queryKey: permissionKey(),
    queryFn: async () => {
      const permissions = await RolePermissionService.getPermissions()
      const groupedPermissions: { [group: string]: Permission[] } = {}
      permissions.forEach((permission: Permission) => {
        const group = permission.name.split("-")[0] || "Other"
        if (!groupedPermissions[group]) {
          groupedPermissions[group] = []
        }
        groupedPermissions[group].push(permission)
      })
      return groupedPermissions
    }
    // staleTime: Infinity,
  })

  return {
    permissions: data,
    error,
    isPending
  }
}

export function useFetchRolePermissions(roleId: UUID) {
  const { data, error, isPending } = useQuery({
    queryKey: rolePermissionKey(roleId),
    queryFn: () => RolePermissionService.getRolePermissions(roleId),
    enabled: !!roleId,
    staleTime: Infinity
  })

  return {
    rolePermissions: data,
    error,
    isPending
  }
}
