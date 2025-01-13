import { UUID } from "crypto"

// export type Permission =
//   |"ROLE_CREATE" 
//   | "ROLE_DELETE" 
//   | "ROLE_UPDATE" 
//   | "ROLE_GET_ALL" 
//   |"PERMISSION_CREATE" 
//   | "PERMISSION_DELETE" 
//   | "PERMISSION_UPDATE" 
//   | "PERMISSION_GET_ONE"
//   | "PERMISSION_GET_ALL"
//   | "USER_CREATE" 
//   | "USER_DELETE" 
//   | "USER_UPDATE" 
//   | "USER_GET_ALL"
//   | "COMPANY-READ"
//   | "COMPANY-READ-ALL"
//   | "COMPANY-UPDATE"
//   | "COMPANY-DELETE"
//   | "WORKSPACE-CREATE"
//   | "WORKSPACE-READ"
//   | "WORKSPACE-READ-ALL"
//   | "WORKSPACE-UPDATE"
//   | "WORKSPACE-DELETE"
//   | "PROJECT-CREATE"
//   | "PROJECT-READ"
//   | "PROJECT-READ-ALL"
//   | "PROJECT-UPDATE"
//   | "PROJECT-DELETE"
//   | "TASK-CREATE"
//   | "TASK-READ"
//   | "TASK-READ-ALL"
//   | "TASK-UPDATE"
//   | "TASK-DELETE"

export interface Role {
  id:UUID
  name: string
  permissions: Set<Permission>
}
export type Permission= {
  id: UUID
  name: string
}

export interface RolePermission {
  roleId: UUID
  permissionId: UUID
}