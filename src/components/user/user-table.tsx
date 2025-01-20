// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"

// interface User {
//   id: string
//   name: string
//   email: string
//   status: "ACTIVE" | "BLOCKED"
// }

// interface UserTableProps {
//   users: User[]
//   onToggleStatus: (userId: string, currentStatus: string) => void
// }

// export function UserTable({ users, onToggleStatus }: UserTableProps) {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Name</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {users.map((user) => (
//           <TableRow key={user.id}>
//             <TableCell>{user.name}</TableCell>
//             <TableCell>{user.email}</TableCell>
//             <TableCell>{user.status}</TableCell>
//             <TableCell>
//               <Button
//                 variant={user.status === "ACTIVE" ? "destructive" : "default"}
//                 onClick={() => onToggleStatus(user.userId, user.status)}
//               >
//                 {user.status === "ACTIVE" ? "Block" : "Unblock"}
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { User } from "@/types"

interface UserTableProps {
  users: User[]
  onToggleStatus: (userId: string, currentStatus: string) => Promise<void>
}

export function UserTable({ users, onToggleStatus }: UserTableProps) {
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    setUpdatingUserId(userId)
    setError(null)

    try {
      await onToggleStatus(userId, currentStatus)
    } catch (e) {
      setError("Failed to update user status. Please try again.")
    } finally {
      setUpdatingUserId(null)
    }
  }

  return (
    <div>
      {error && <div className="bg-red-100 text-red-600 p-4 rounded mb-4">{error}</div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.userId}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button
                  variant={user.status === "ACTIVE" ? "destructive" : "default"}
                  disabled={updatingUserId === user.userId}
                  onClick={() => handleToggleStatus(user.userId, user.status)}
                >
                  {updatingUserId === user.userId
                    ? "Updating..."
                    : user.status === "ACTIVE"
                    ? "Block"
                    : "Unblock"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
