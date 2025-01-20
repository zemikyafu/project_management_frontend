import React from "react"
import { UserTable } from "../../components/user/user-table"
import { useFetchUser, useUpdateUserStatus } from "@/features/user-hook"
import { useState } from "react"
import { UUID } from "crypto"
export function UserManagement() {
  const { users = [], error, isLoading } = useFetchUser()
  const updateStatusMutation = useUpdateUserStatus()

  const toggleUserStatus = async (userId: UUID, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"
    await updateStatusMutation.mutateAsync({ userId, status: newStatus })
  }

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error loading users.</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          {users && <UserTable users={users} onToggleStatus={toggleUserStatus} />}
        </div>
      </main>
    </div>
  )
}
