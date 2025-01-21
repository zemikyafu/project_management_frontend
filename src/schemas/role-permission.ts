import { z } from "zod"

const RoleCreateSchema = z.object({
  name: z.string().nonempty({ message: "name can not be empty" }),
  companyId: z.string().uuid({ message: "companyId must be a valid UUID" })
})

const RolePermissionSchema = z.object({
  roleId: z.string().uuid({ message: "roleId must be a valid UUID" }),
  permissionId: z.string().uuid({ message: "permissionId must be a valid UUID" })
})
export type RoleCreateFormValues = z.infer<typeof RoleCreateSchema>
export type RolePermissionFormValues = z.infer<typeof RolePermissionSchema>
