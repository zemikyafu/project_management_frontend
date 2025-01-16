import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ProjectList } from "@/components/project/project-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const WorkspaceProjects: React.FC = () => {
  const [workspaceName, setWorkspaceName] = useState("")
  const [companyId, setCompanyId] = useState("")
  const { id: workspaceId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const handleSelectedWorkspace = ({
    companyId,
    workspaceName
  }: {
    companyId: string
    workspaceName: string
  }) => {
    setWorkspaceName(workspaceName)
    setCompanyId(companyId)
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/workspaces/${companyId}`)}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Projects in {workspaceName}</h1>
      </div>
      {/* <ProjectList workspaceId={workspaceId!} onSelectedWorkspace={handleSelectedWorkspace} /> */}
      <ProjectList />
    </div>
  )
}

export default WorkspaceProjects
