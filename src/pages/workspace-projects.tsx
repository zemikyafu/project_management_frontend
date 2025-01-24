import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ProjectList } from "@/components/project/project-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useFetchWorkspaceByWorkspaceId } from "@/features/workspace-hook"
import { UUID } from "crypto"
const WorkspaceProjects: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const { workspace } = useFetchWorkspaceByWorkspaceId(workspaceId as UUID)
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() =>
            navigate(workspace ? `/workspaces/${workspace.company.id}` : `/workspaces/`)
          }
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Projects in {workspace?.name || ""}</h1>
      </div>
      {workspaceId && <ProjectList workspaceId={workspaceId} />}
    </div>
  )
}

export default WorkspaceProjects
