import { useState } from "react"
import { UserTable } from "../../components/user/user-table"
import { InviteUserForm } from "../../components/user/invitation-form"
import { Button } from "@/components/ui/button"
import { Navbar } from "../../components/navbar"
import { Sidebar } from "../../components/sidebar"
interface User {
  id: string
  name: string
  email: string
  status: "active" | "blocked"
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "blocked" }
  ])

  const [showInviteForm, setShowInviteForm] = useState(false)

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    )
  }

  const addUser = (newUser: Omit<User, "id">) => {
    const id = (users.length + 1).toString()
    setUsers([...users, { ...newUser, id }])
    setShowInviteForm(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Button onClick={() => setShowInviteForm(true)}>Invite User</Button>
            {showInviteForm && (
              <InviteUserForm onInvite={addUser} onCancel={() => setShowInviteForm(false)} />
            )}
            <UserTable users={users} onToggleStatus={toggleUserStatus} />
          </div>
        </main>
      </div>
    </div>
  )
}
