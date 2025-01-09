import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface AddRoleDialogProps {
  onAddRole: (roleName: string) => void
}

export function AddRoleDialog({ onAddRole }: AddRoleDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      onAddRole(newRoleName.trim())
      setNewRoleName("")
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Create New Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Role Name
            </Label>
            <Input
              id="name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleAddRole}>Add Role</Button>
      </DialogContent>
    </Dialog>
  )
}
