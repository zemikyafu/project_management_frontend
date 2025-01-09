import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AddRoleDialog } from "./role-dialog"
import { PermissionGroup } from "./permission-group"
import { PERMISSION_GROUPS, INITIAL_ROLES } from "../../constants/permissions"
import { Role, Permission } from "../../types/role"

export function RoleManagementMatrix() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES)
  const [activeTab, setActiveTab] = useState(roles[0].name)

  const togglePermission = (roleName: string, permission: Permission) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.name === roleName
          ? {
              ...role,
              permissions: role.permissions.has(permission)
                ? new Set([...role.permissions].filter((p) => p !== permission))
                : new Set([...role.permissions, permission])
            }
          : role
      )
    )
  }

  const addNewRole = (roleName: string) => {
    setRoles((prevRoles) => [...prevRoles, { name: roleName, permissions: new Set() }])
    setActiveTab(roleName)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Role Management Matrix</h1>
      <div className="mb-6">
        <AddRoleDialog onAddRole={addNewRole} />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 h-14 items-stretch">
          {roles.map((role) => (
            <TabsTrigger key={role.name} value={role.name} className="text-lg">
              {role.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {roles.map((role) => (
          <TabsContent key={role.name} value={role.name}>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {Object.entries(PERMISSION_GROUPS).map(([group, permissions]) => (
                    <PermissionGroup
                      key={group}
                      group={group}
                      permissions={permissions}
                      rolePermissions={role.permissions}
                      onTogglePermission={(permission) => togglePermission(role.name, permission)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
