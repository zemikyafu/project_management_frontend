import type { Permission } from "../../types/role"
import { Label } from "@/components/ui/label"

interface PermissionGroupProps {
  group: string
  permissions: Permission[]
  rolePermissions: Set<string>
  onTogglePermission: (permissionId: string) => void
}

export function PermissionGroup({
  group,
  permissions,
  rolePermissions,
  onTogglePermission
}: PermissionGroupProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{group}</h2>
      <div className="grid gap-4 mt-4 grid-cols-3">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${group}-${permission}`}
              checked={rolePermissions.has(permission.id)}
              onChange={() => onTogglePermission(permission.id)}
            />
            <Label htmlFor={`${group}-${permission.id}`}>{permission.name}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
