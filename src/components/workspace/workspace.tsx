import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus } from "lucide-react"

interface Workspace {
  id: string
  name: string
  description: string
}

const Workspace: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [newWorkspace, setNewWorkspace] = useState({ name: "", description: "" })
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null)
  const navigate = useNavigate()

  const handleCreate = () => {
    const workspace = {
      id: Date.now().toString(),
      ...newWorkspace
    }
    setWorkspaces([...workspaces, workspace])
    setNewWorkspace({ name: "", description: "" })
  }

  const handleUpdate = () => {
    if (editingWorkspace) {
      setWorkspaces(workspaces.map((w) => (w.id === editingWorkspace.id ? editingWorkspace : w)))
      setEditingWorkspace(null)
    }
  }

  const handleDelete = (id: string) => {
    setWorkspaces(workspaces.filter((w) => w.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Workspaces</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Create Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Workspace Name"
                value={newWorkspace.name}
                onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newWorkspace.description}
                onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
              />
              <Button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white">
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {workspaces.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">No workspaces available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card key={workspace.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{workspace.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/workspaces/${workspace.id}`)}>
                      View Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditingWorkspace(workspace)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(workspace.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{workspace.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editingWorkspace} onOpenChange={() => setEditingWorkspace(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Workspace</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Workspace Name"
              value={editingWorkspace?.name || ""}
              onChange={(e) =>
                setEditingWorkspace(
                  editingWorkspace
                    ? {
                        ...editingWorkspace,
                        name: e.target.value
                      }
                    : null
                )
              }
            />
            <Textarea
              placeholder="Description"
              value={editingWorkspace?.description || ""}
              onChange={(e) =>
                setEditingWorkspace(
                  editingWorkspace
                    ? {
                        ...editingWorkspace,
                        description: e.target.value
                      }
                    : null
                )
              }
            />
            <Button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Workspace
