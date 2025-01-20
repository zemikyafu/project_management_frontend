import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Invitation } from "@/types"

interface UserTableProps {
  invitations: Invitation[]
}

export function InvitationTable({ invitations }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Workspace</TableHead>
          <TableHead>Invitation Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => (
          <TableRow key={invitation.id}>
            <TableCell>{invitation.email}</TableCell>
            <TableCell>{invitation.roleName}</TableCell>
            <TableCell>{invitation.workspaceName}</TableCell>
            <TableCell>
              {invitation.accepted ? (
                <span className="text-green-500 font-semibold">Accepted</span>
              ) : (
                <span className="text-yellow-500 font-semibold">Pending</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
