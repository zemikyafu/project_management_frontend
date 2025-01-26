import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFetchWorkspaces } from "@/features/workspace-hook"
import { useFetchRoles } from "@/features/role-hook"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogFooter
} from "@/components/ui/dialog"
import { Workspace, Role } from "@/types"
import { UUID } from "crypto"
import { useCreateInvitation } from "@/features/invitation-hook"

interface InviteUserFormProps {
  companyId: UUID
  onCancel: () => void
}

export function InviteUserForm({ companyId, onCancel }: InviteUserFormProps) {
  const {
    workspaces,
    error: workspacesError,
    isLoading: isWorkspaceLoading
  } = useFetchWorkspaces(companyId)
  const { roles, error: rolesError, isLoading: isRoleLoading } = useFetchRoles(companyId)
  const createInvitationMutation = useCreateInvitation()

  const [workspaceId, setWorkspaceId] = useState("")
  const [roleId, setRoleId] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && workspaceId && roleId) {
      createInvitationMutation.mutate({ recipientEmail: email, workspaceId, roleId })
      setEmail("")
      setWorkspaceId("")
      setRoleId("")
    }
  }

  return (
    <Dialog open>
      <DialogOverlay className="bg-black bg-opacity-5" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workspace">Workspace</Label>
            <select
              id="workspace"
              onChange={(e) => setWorkspaceId(e.target.value)}
              value={workspaceId}
              className="p-3 border rounded w-full bg-white shadow-md"
              required
            >
              {isWorkspaceLoading ? (
                <option value="">Loading workspaces...</option>
              ) : workspacesError ? (
                <option value="">Error loading workspaces</option>
              ) : (
                <>
                  <option value="">Select a workspace</option>
                  {workspaces?.map((workspace: Workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              onChange={(e) => setRoleId(e.target.value)}
              value={roleId}
              required
              className="p-3 border rounded w-full bg-white shadow-md"
            >
              {isRoleLoading ? (
                <option value="">Loading roles...</option>
              ) : rolesError ? (
                <option value="">Error loading roles</option>
              ) : (
                <>
                  <option value="">Select a role</option>
                  {roles?.map((role: Role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <DialogFooter className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Invite</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
