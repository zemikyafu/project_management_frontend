import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  email: string
  status: "active" | "blocked"
}

interface UserTableProps {
  users: User[]
  onToggleStatus: (userId: string) => void
}

export function UserTable({ users, onToggleStatus }: UserTableProps) {
  return (
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
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>
              <Button
                variant={user.status === "active" ? "destructive" : "default"}
                onClick={() => onToggleStatus(user.id)}
              >
                {user.status === "active" ? "Block" : "Unblock"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
