import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import {
  useFetchProjects,
  useCreateProject,
  useUpdateProject
  // useDeleteProject
} from "@/features/project-hook"
import { Project, ProjectStatus } from "@/types"
import { UUID } from "crypto"

const statusColors = {
  NOT_STARTED: "bg-yellow-100",
  IN_PROGRESS: "bg-blue-100",
  COMPLETED: "bg-green-100",
  ON_HOLD: "bg-red-100"
}
interface ProjectListProps {
  workspaceId: string
}

export const ProjectList: React.FC<ProjectListProps> = ({ workspaceId }) => {
  const navigate = useNavigate()
  const {
    projects,
    isLoading: isProjectsLoading,
    error: fetchError
  } = useFetchProjects(workspaceId as UUID)
  const createProjectMutation = useCreateProject(workspaceId as UUID)
  const updateProjectMutation = useUpdateProject(workspaceId as UUID)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogError, setDialogError] = useState<string | null>(null)

  const [createProjectForm, setCreateProjectForm] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    status: ProjectStatus.NOT_STARTED,
    workspaceId: workspaceId!,
    startDate: "",
    endDate: ""
  })

  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleCreate = () => {
    createProjectMutation.mutate(createProjectForm, {
      onSuccess: () => {
        setDialogOpen(false)
        setDialogError(null)
        setCreateProjectForm({
          name: "",
          description: "",
          status: ProjectStatus.NOT_STARTED,
          workspaceId: workspaceId!,
          startDate: "",
          endDate: ""
        })
      },
      onError: (error) => {
        setDialogError(error.message || "Error creating project.")
      }
    })
  }

  const handleUpdate = () => {
    if (!editingProject) return

    updateProjectMutation.mutate(editingProject, {
      onSuccess: () => {
        setDialogOpen(false)
        setEditingProject(null)
        setDialogError(null)
      },
      onError: (error) => {
        setDialogError(error.message || "Error updating project.")
      }
    })
  }

  const openCreateDialog = () => {
    setCreateProjectForm({
      name: "",
      description: "",
      status: ProjectStatus.NOT_STARTED,
      workspaceId: workspaceId!,
      startDate: "",
      endDate: ""
    })
    setEditingProject(null)
    setDialogError(null)
    setDialogOpen(true)
  }

  const openEditDialog = (project: Project) => {
    setEditingProject(project)
    setDialogError(null)
    setDialogOpen(true)
  }

  if (isProjectsLoading) {
    return <div>Loading projects...</div>
  }

  if (fetchError) {
    return <div>Error fetching projects: {fetchError.message}</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button onClick={openCreateDialog} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {dialogError && <p className="text-red-500">{dialogError}</p>}
            <Input
              placeholder="Project Name"
              value={editingProject ? editingProject.name : createProjectForm.name}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, name: e.target.value })
                } else {
                  setCreateProjectForm({ ...createProjectForm, name: e.target.value })
                }
              }}
            />
            <Textarea
              placeholder="Description"
              value={editingProject ? editingProject.description : createProjectForm.description}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, description: e.target.value })
                } else {
                  setCreateProjectForm({ ...createProjectForm, description: e.target.value })
                }
              }}
            />
            <Select
              value={editingProject ? editingProject.status : createProjectForm.status}
              onValueChange={(value) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, status: value as ProjectStatus })
                } else {
                  setCreateProjectForm({ ...createProjectForm, status: value as ProjectStatus })
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="ON_HOLD">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              placeholder="Start Date"
              value={editingProject ? editingProject.startDate : createProjectForm.startDate}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, startDate: e.target.value })
                } else {
                  setCreateProjectForm({ ...createProjectForm, startDate: e.target.value })
                }
              }}
            />
            <Input
              type="date"
              placeholder="End Date"
              value={editingProject ? editingProject.endDate : createProjectForm.endDate}
              onChange={(e) => {
                if (editingProject) {
                  setEditingProject({ ...editingProject, endDate: e.target.value })
                } else {
                  setCreateProjectForm({ ...createProjectForm, endDate: e.target.value })
                }
              }}
            />
            <Button
              onClick={editingProject ? handleUpdate : handleCreate}
              disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {createProjectMutation.isPending || updateProjectMutation.isPending
                ? "Saving..."
                : editingProject
                ? "Update Project"
                : "Create Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {projects && projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">No projects available in this workspace</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader
                className={`flex flex-row items-center justify-between space-y-0 pb-2 ${
                  statusColors[project.status]
                }`}
              >
                <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => navigate(`/tasks/${workspaceId}/${project.id}`)}
                    >
                      View Tasks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditDialog(project)}>
                      Edit
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                      onClick={() => handleDelete(project.id)}
                      className="text-red-500"
                    >
                      Delete
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="font-semibold">Status: {project.status.replace("_", " ")}</span>
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
