import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"

interface Permission {
  id: UUID
  name: string
}
import RolePermissionService from "../api/role-permission-service"
import { UUID } from "crypto"
import { RoleCreateFormValues, RolePermissionFormValues } from "@/schemas/role-permission"

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
  const { data, error, isLoading } = useQuery({
    queryKey: permissionKey(),
    queryFn: async () => RolePermissionService.getPermissions()
    // staleTime: Infinity,
  })

  return {
    permissions: data,
    error,
    isLoading
  }
}

export function useFetchRolePermissions(companyId: UUID) {
  const { data, error, isLoading } = useQuery({
    queryKey: rolePermissionKey(companyId),
    queryFn: () => RolePermissionService.getRolePermissions(companyId),
    enabled: !!companyId,
    staleTime: Infinity
  })

  return {
    rolePermissions: data,
    error,
    isLoading
  }
}

export function useCreateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (roleData: RoleCreateFormValues) => RolePermissionService.createRole(roleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKey() })
    }
  })
}

export function useDeleteRolePermission() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (rolePermissionData: RolePermissionFormValues) =>
      RolePermissionService.deleteRolePermission(rolePermissionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolePermissionKey() })
    }
  })
}
export function useCreateRolePermission() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (rolePermissionData: RolePermissionFormValues) =>
      RolePermissionService.createRolePermission(rolePermissionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolePermissionKey() })
    }
  })
}
