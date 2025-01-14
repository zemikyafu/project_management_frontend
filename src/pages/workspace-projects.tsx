import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ProjectList } from "@/components/project/project-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const WorkspaceProjects: React.FC = () => {
  const [workspaceName, setWorkspaceName] = useState("")
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    // In a real application, you would fetch the workspace name based on the ID
    // For this example, we'll use a mock name
    setWorkspaceName("Sample Workspace")
  }, [id])

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate("/workspaces")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Projects in {workspaceName}</h1>
      </div>
      <ProjectList workspaceId={id || ""} />
    </div>
  )
}

export default WorkspaceProjects
