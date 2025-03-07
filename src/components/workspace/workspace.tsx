import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFetchCompanies } from "@/features/company-hook"
import {
  useFetchWorkspaces,
  useCreateWorkspace,
  useUpdateWorkspace
} from "@/features/workspace-hook"
import { Company, Workspace } from "@/types"
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
import { UUID } from "crypto"
const WorkspaceForm: React.FC = () => {
  const [newWorkspace, setNewWorkspace] = useState<Omit<Workspace, "id" | "company">>({
    name: "",
    description: ""
  })
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null)
  const navigate = useNavigate()
  const { companyId } = useParams<{ companyId: UUID }>()

  const { data: companies, isLoading: companiesLoading } = useFetchCompanies()
  const { workspaces, error, isLoading } = useFetchWorkspaces(companyId as UUID)
  const createWorkspaceMutation = useCreateWorkspace(companyId as UUID)
  const updateWorkspaceMutation = useUpdateWorkspace(companyId as UUID)

  const handleCompanySelect = (id: string) => {
    navigate(`/workspaces/${id}`)
  }

  const handleCreate = () => {
    createWorkspaceMutation.mutate(
      { ...newWorkspace, companyId: companyId || "" },
      {
        onSuccess: () => {
          setNewWorkspace({ name: "", description: "" })
        }
      }
    )
  }

  const handleUpdate = () => {
    if (editingWorkspace) {
      updateWorkspaceMutation.mutate(editingWorkspace, {
        onSuccess: () => setEditingWorkspace(null)
      })
    }
  }

  const handleDelete = (id: string) => {}

  if (!companyId) {
    return (
      <div className="flex flex-col items-center py-10">
        {companiesLoading ? (
          <p className="text-xl">Loading companies...</p>
        ) : (
          <>
            <p className="text-xl mb-4">Select a company to view its workspaces</p>
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

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl mb-4">Loading workspaces...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-xl mb-4 text-red-500">Failed to load workspaces. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Workspaces in {workspaces && workspaces.length > 0 ? workspaces[0].company.name : "N/A"}
        </h2>
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
              <Button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={createWorkspaceMutation.isPending}
              >
                {createWorkspaceMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {workspaces && workspaces.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">No workspaces available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces?.map((workspace: Workspace) => (
            <Card key={String(workspace.id)}>
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
                    <DropdownMenuItem onClick={() => navigate(`/projects/${workspace.id}`)}>
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
                <p className="text-sm text-muted-foreground">{workspace.description}</p>
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
                  editingWorkspace ? { ...editingWorkspace, name: e.target.value } : null
                )
              }
            />
            <Textarea
              placeholder="Description"
              value={editingWorkspace?.description || ""}
              onChange={(e) =>
                setEditingWorkspace(
                  editingWorkspace ? { ...editingWorkspace, description: e.target.value } : null
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

export default WorkspaceForm
