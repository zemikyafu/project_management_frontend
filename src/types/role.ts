import { UUID } from "crypto"

export interface Role {
  id: UUID
  name: string
  permissions: Set<Permission>
}
export type Permission = {
  id: UUID
  name: string
}

export interface RolePermission {
  role: Role
  permission: Permission
}
