import { KanbanBoard } from "../components/task/kanban-board"
import { useParams } from "react-router-dom"
import { useFetchProjects } from "../features/project-hook"
import { UUID } from "crypto"
export function TaskManagement() {
  const { workspaceId, projectId } = useParams()

  const { projects, error, isLoading } = useFetchProjects(workspaceId as UUID)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 overflow-auto">
          <KanbanBoard projects={projects || []} projectId={projectId || ""} />
        </main>
      </div>
    </div>
  )
}
