import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AddRoleDialog } from "./role-dialog"
import { PermissionGroup } from "./permission-group"
import { Role, Permission } from "../../types/role"
import {
  useFetchRoles,
  useFetchRolePermissions,
  useFetchPermissions
} from "../../features/role-management"

export function RoleManagementMatrix() {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<{ [roleName: string]: Set<Permission> }>({})
  const [allPermissions, setAllPermissions] = useState<{ [group: string]: Permission[] }>({}) // Grouped permissions
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined)
  const token = localStorage.getItem("token")
  const companyId = "8f22b299-6017-435c-9df2-d50f19a4bcf0"

  // const { roles: rolesData, error: rolesError, isPending: rolesPending } = useFetchRoles(companyId)

  // const {
  //   permissions: permissionsData,
  //   error: permissionsError,
  //   isPending: permissionsPending
  // } = useFetchPermissions()

  // const {
  //   rolePermissions: rolePermissionsData,
  //   error: rolePermissionsError,
  //   isPending: rolePermissionsPending
  // } = useFetchRolePermissions(roleId)

  useEffect(() => {
    // console.log("rolesData", rolesData)
    fetch(`http://localhost:8080/api/v1/roles/companyId/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const fetchedRoles = data.data.map((role: any) => ({
            id: role.id,
            name: role.name
          }))
          fetchedRoles.sort((a: Role, b: Role) =>
            a.name === "Admin" ? -1 : b.name === "Admin" ? 1 : 0
          )

          setRoles(fetchedRoles)
          setActiveTab(fetchedRoles[0]?.name || null)
        }
      })
      .catch((error) => console.error("Failed to fetch roles:", error))
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/permissions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const groupedPermissions: { [group: string]: Permission[] } = {}

          data.data.forEach((permission: any) => {
            const group = permission.name.split("-")[0] || "Other"
            if (!groupedPermissions[group]) {
              groupedPermissions[group] = []
            }
            groupedPermissions[group].push(permission.name)
          })

          setAllPermissions(groupedPermissions)
        }
      })
      .catch((error) => console.error("Failed to fetch permissions:", error))
  }, [])

  useEffect(() => {
    if (!roles.length) return

    const fetchPermissionsForRoles = async () => {
      const rolePermissions: { [roleName: string]: Set<Permission> } = {}

      await Promise.all(
        roles.map(async (role) => {
          const response = await fetch(
            `http://localhost:8080/api/v1/roles/${role.id}/permissions`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          const data = await response.json()
          if (data.status === "success") {
            const permissionsSet: Set<Permission> = new Set(
              data.data.map((entry: any) => entry.permission.name as Permission)
            )
            rolePermissions[role.name] = permissionsSet
          }
        })
      )

      setPermissions(rolePermissions)
    }

    fetchPermissionsForRoles()
  }, [roles])

  const togglePermission = (roleName: string, permission: Permission) => {
    setPermissions((prevPermissions) => {
      const rolePermissions = prevPermissions[roleName] || new Set()
      const updatedPermissions = rolePermissions.has(permission)
        ? new Set([...rolePermissions].filter((p) => p !== permission))
        : new Set([...rolePermissions, permission])

      return { ...prevPermissions, [roleName]: updatedPermissions }
    })
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
                  {Object.entries(allPermissions).map(([group, groupPermissions]) => (
                    <PermissionGroup
                      key={group}
                      group={group}
                      permissions={groupPermissions}
                      rolePermissions={permissions[role.name] || new Set()}
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
