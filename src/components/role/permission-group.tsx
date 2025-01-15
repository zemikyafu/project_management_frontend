import { Permission } from "../../types/role"

export function PermissionGroup({
  group,
  permissions,
  rolePermissions,
  onTogglePermission
}: {
  group: string
  permissions: Permission[]
  rolePermissions: Set<Permission>
  onTogglePermission: (permission: Permission) => void
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{group}</h2>
      <div className="grid gap-4 mt-4 grid-cols-3">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center">
            <input
              type="checkbox"
              id={`${group}-${permission}`}
              checked={rolePermissions.has(permission)}
              onChange={() => onTogglePermission(permission)}
            />
            <label htmlFor={`${group}-${permission}`} className="ml-2">
              {permission.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
