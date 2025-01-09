import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Permission } from "../../types/role"

interface PermissionGroupProps {
  group: string
  permissions: string[]
  rolePermissions: Set<Permission>
  onTogglePermission: (permission: Permission) => void
}

export function PermissionGroup({
  group,
  permissions,
  rolePermissions,
  onTogglePermission
}: PermissionGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{group}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {permissions.map((permission) => (
          <div key={permission} className="flex items-center space-x-2">
            <Checkbox
              id={`${group}-${permission}`}
              checked={rolePermissions.has(permission as Permission)}
              onCheckedChange={() => onTogglePermission(permission as Permission)}
            />
            <Label
              htmlFor={`${group}-${permission}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {permission}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
