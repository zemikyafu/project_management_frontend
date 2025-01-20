// import { useState } from "react"
// import { UserTable } from "../../components/user/user-table"
// import { InviteUserForm } from "../../components/user/invitation-form"
// import { Button } from "@/components/ui/button"
// import { useFetchUser, useUpdateUserStatus } from "@/features/user-hook"
// import { UUID } from "crypto"

// export function UserManagement() {
//   const { users, error, isLoading } = useFetchUser()
//   const [showInviteForm, setShowInviteForm] = useState(false)
//   console.log("Users", users)
//   const { mutate: updateStatus } = useUpdateUserStatus()

//   const toggleUserStatus = (userId: UUID, currentStatus: string) => {
//     const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"
//     updateStatus({ userId, status: newStatus })
//   }

//   const addUser = (newUser: { name: string; email: string; status: "ACTIVE" | "BLOCKED" }) => {
//     setShowInviteForm(false)
//   }

//   if (isLoading) {
//     return <div>Loading users...</div>
//   }

//   if (error) {
//     return <div>Error loading users: {error.message}</div>
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex flex-1">
//         <main className="flex-1 p-6 overflow-auto">
//           <div className="container mx-auto p-4 space-y-4">
//             <h1 className="text-2xl font-bold">User Management</h1>
//             <Button onClick={() => setShowInviteForm(true)}>Invite User</Button>
//             {showInviteForm && (
//               <InviteUserForm onInvite={addUser} onCancel={() => setShowInviteForm(false)} />
//             )}
//             {users && <UserTable users={users} onToggleStatus={toggleUserStatus} />}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

import React from "react"
import { UserTable } from "../../components/user/user-table"
import { useFetchUser, useUpdateUserStatus } from "@/features/user-hook"
import { InviteUserForm } from "../../components/user/invitation-form"
// import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UUID } from "crypto"
export function UserManagement() {
  const { users = [], error, isLoading } = useFetchUser()
  const updateStatusMutation = useUpdateUserStatus()
  const [showInviteForm, setShowInviteForm] = useState(false)

  const toggleUserStatus = async (userId: UUID, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE"
    await updateStatusMutation.mutateAsync({ userId, status: newStatus })
  }

  if (isLoading) {
    // return <Spinner />
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
