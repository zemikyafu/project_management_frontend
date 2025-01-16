import { Sidebar } from "../components/sidebar"
import { Navbar } from "../components/navbar"
import { KanbanBoard } from "../components/task/kanban-board"
import { useParams } from "react-router-dom"
export function TaskManagement() {
  const projectId = useParams<{ projectId: string }>().projectId
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-6 overflow-auto">
          <KanbanBoard />
        </main>
      </div>
    </div>
  )
}
