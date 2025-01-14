import React, { useState } from "react"
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

interface Project {
  id: string
  name: string
  description: string
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  startDate: string
  endDate: string
}

const statusColors = {
  NOT_STARTED: "bg-yellow-100",
  IN_PROGRESS: "bg-blue-100",
  COMPLETED: "bg-green-100"
}

interface ProjectListProps {
  workspaceId: string
}

export const ProjectList: React.FC<ProjectListProps> = ({ workspaceId }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    status: "NOT_STARTED",
    startDate: "",
    endDate: ""
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject
    }
    setProjects([...projects, project])
    setNewProject({
      name: "",
      description: "",
      status: "NOT_STARTED",
      startDate: "",
      endDate: ""
    })
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleUpdateProject = () => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)))
      setEditingProject(null)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <Select
                value={newProject.status}
                onValueChange={(value: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED") =>
                  setNewProject({ ...newProject, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                placeholder="Start Date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
              />
              <Input
                type="date"
                placeholder="End Date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
              />
              <Button
                onClick={handleCreateProject}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">No projects available in this workspace</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
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
                    <DropdownMenuItem onSelect={() => setEditingProject(project)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </DropdownMenuItem>
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

      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Project Name"
              value={editingProject?.name || ""}
              onChange={(e) =>
                setEditingProject(
                  editingProject ? { ...editingProject, name: e.target.value } : null
                )
              }
            />
            <Textarea
              placeholder="Description"
              value={editingProject?.description || ""}
              onChange={(e) =>
                setEditingProject(
                  editingProject ? { ...editingProject, description: e.target.value } : null
                )
              }
            />
            <Select
              value={editingProject?.status || ""}
              onValueChange={(value: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED") =>
                setEditingProject(editingProject ? { ...editingProject, status: value } : null)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              placeholder="Start Date"
              value={editingProject?.startDate || ""}
              onChange={(e) =>
                setEditingProject(
                  editingProject ? { ...editingProject, startDate: e.target.value } : null
                )
              }
            />
            <Input
              type="date"
              placeholder="End Date"
              value={editingProject?.endDate || ""}
              onChange={(e) =>
                setEditingProject(
                  editingProject ? { ...editingProject, endDate: e.target.value } : null
                )
              }
            />
            <Button
              onClick={handleUpdateProject}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
