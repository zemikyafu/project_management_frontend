import React, { useState, useMemo, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AddRoleDialog } from "./role-dialog"
import { PermissionGroup } from "./permission-group"
import type { Permission, RolePermission } from "../../types/role"
import {
  useFetchRoles,
  useFetchRolePermissions,
  useFetchPermissions,
  useCreateRole,
  useDeleteRolePermission,
  useCreateRolePermission
} from "../../features/role-hook"
import { useParams, useNavigate } from "react-router-dom"
import { useFetchCompanies } from "@/features/company-hook"
import type { UUID } from "crypto"
import type { Company, Role } from "@/types"
import { RoleCreateFormValues } from "@/schemas/role-permission"

export function RoleManagementMatrix() {
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined)
  const { companyId } = useParams<{ companyId: UUID }>()
  const navigate = useNavigate()

  const { data: companies, isLoading: companiesLoading } = useFetchCompanies()
  const { roles, isLoading: rolesLoading, error: rolesError } = useFetchRoles(companyId as UUID)
  const {
    permissions,
    isLoading: permissionsLoading,
    error: permissionsError
  } = useFetchPermissions()
  const {
    rolePermissions,
    isLoading: rolePermissionsLoading,
    error: rolePermissionsError
  } = useFetchRolePermissions(companyId as UUID)

  const mutateRoles = useCreateRole()
  const mutateDeleteRolePermission = useDeleteRolePermission()
  const mutateCreateRolePermission = useCreateRolePermission()
  const handleCompanySelect = (id: string) => {
    navigate(`/roleManagement/${id}`)
  }

  const allPermissions = useMemo(() => {
    const permissionGroups: { [group: string]: Permission[] } = {}
    permissions?.forEach((permission: Permission) => {
      const group = permission.name.split("-")[0] || "Other"
      if (!permissionGroups[group]) {
        permissionGroups[group] = []
      }
      permissionGroups[group].push(permission)
    })
    return permissionGroups
  }, [permissions])

  const rolePermissionMap = useMemo(() => {
    const map: { [roleId: string]: Set<string> } = {}
    rolePermissions?.forEach((rp: RolePermission) => {
      if (!map[rp.role.id]) {
        map[rp.role.id] = new Set()
      }
      map[rp.role.id].add(rp.permission.id)
    })
    return map
  }, [rolePermissions])

  const togglePermission = async (roleId: string, permissionId: string) => {
    try {
      const existingRelation = rolePermissions?.find(
        (rp: RolePermission) => rp.role.id === roleId && rp.permission.id === permissionId
      )
      if (existingRelation) {
        await mutateDeleteRolePermission.mutateAsync(existingRelation.id)
      } else {
        await mutateCreateRolePermission.mutateAsync({ roleId, permissionId })
      }
    } catch (error) {
      console.error("Error toggling permission:", error)
    }
  }

  const addNewRole = async (roleName: string) => {
    if (!companyId) return

    const newRole: RoleCreateFormValues = {
      name: roleName,
      companyId: companyId
    }

    const response = await mutateRoles.mutateAsync(newRole)
    if (response) {
      setActiveTab(response?.id)
    }
  }

  useEffect(() => {
    if (roles && roles.length > 0 && !activeTab) {
      setActiveTab(roles[0].id)
    }
  }, [roles, activeTab])

  if (!companyId) {
    return (
      <div className="flex flex-col items-center py-10">
        {companiesLoading ? (
          <p className="text-xl">Loading companies...</p>
        ) : (
          <>
            <p className="text-xl mb-4">Select a company to view the Role permission matrix</p>
            <select
              onChange={(e) => handleCompanySelect(e.target.value)}
              className="p-3 border rounded w-80 bg-white shadow-md"
            >
              <option value="">Select a company</option>
              {companies?.map((company: Company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    )
  }

  if (rolesLoading || permissionsLoading || rolePermissionsLoading) {
    return <div>Loading Role and permissions...</div>
  }

  if (rolesError || permissionsError || rolePermissionsError) {
    return <div>Error loading Role Management Matrix.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Role Management Matrix</h1>
      <div className="mb-6">
        <AddRoleDialog onAddRole={addNewRole} />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 h-14 items-stretch">
          {roles?.map((role: Role) => (
            <TabsTrigger key={role.id} value={role.id} className="text-lg">
              {role.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {roles?.map((role: Role) => (
          <TabsContent key={role.id} value={role.id}>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {Object.entries(allPermissions).map(([group, groupPermissions]) => (
                    <PermissionGroup
                      key={group}
                      group={group}
                      permissions={groupPermissions}
                      rolePermissions={rolePermissionMap[role.id] || new Set()}
                      onTogglePermission={(permissionId) => togglePermission(role.id, permissionId)}
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
