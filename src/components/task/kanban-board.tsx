import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Column } from "./board-column"
import {
  KanbanData,
  Task,
  Project,
  TaskPriority,
  TaskStatus,
  Column as ColumnType
} from "../../types/index"
import {
  useFetchTasks,
  useFetchAssigneesFromWorkspace,
  useCreateTask,
  useUpdateTask
} from "../../features/task-hook"
import { UUID } from "crypto"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { title } from "process"
import { UpdateTaskSchema } from "@/schemas/task"

const initialData: KanbanData = {
  columns: {
    BACKLOG: { id: "BACKLOG", title: "To Do", tasks: [] },
    IN_PROGRESS: { id: "IN_PROGRESS", title: "In Progress", tasks: [] },
    IN_REVIEW: { id: "IN_REVIEW", title: "In Review", tasks: [] },
    COMPLETED: { id: "COMPLETED", title: "Completed", tasks: [] }
  },
  columnOrder: ["BACKLOG", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"],
  users: [],
  projects: [],
  currentProjectId: null
}

interface KanbanBoardProps {
  projects: Project[]
  projectId: string
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ projects, projectId }) => {
  const { workspaceId } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<KanbanData>(initialData)
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    content: "",
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.BACKLOG,
    projectId: projectId || "",
    assignee: { id: "", name: "" },
    deadlineAt: ""
  })

  const {
    tasks = [],
    error: tasksError,
    isLoading: tasksLoading
  } = useFetchTasks(data.currentProjectId as UUID)
  const {
    assignees = [],
    error: assigneesError,
    isLoading: assigneesLoading
  } = useFetchAssigneesFromWorkspace(projectId as UUID)

  const createTaskMutation = useCreateTask(projectId as UUID)
  const updateTaskMutation = useUpdateTask(projectId as UUID)

  useEffect(() => {
    const loadProjects = async () => {
      setData((prevData) => ({
        ...prevData,
        projects,
        currentProjectId: projects.length > 0 ? projects[0].id : null
      }))
    }
    loadProjects()
  }, [projects])

  useEffect(() => {
    if (!tasks.length) {
      setData((prevData: KanbanData) => ({
        ...prevData,
        columns: prevData.columnOrder.reduce(
          (columns: { [key: string]: ColumnType }, columnId: string) => {
            columns[columnId] = {
              ...prevData.columns[columnId],
              tasks: []
            }
            return columns
          },
          {} as { [key: string]: ColumnType }
        )
      }))
    } else {
      setData((prevData: KanbanData) => ({
        ...prevData,
        columns: prevData.columnOrder.reduce(
          (columns: { [key: string]: ColumnType }, columnId: string) => {
            columns[columnId] = {
              ...prevData.columns[columnId],
              tasks: tasks.filter((task) => task.status === columnId)
            }
            return columns
          },
          {} as { [key: string]: ColumnType }
        )
      }))
    }
  }, [tasks, data.currentProjectId])

  const changeProject = (projectId: string) => {
    console.log("projectId", projectId)
    setData((prevData) => ({
      ...prevData,
      currentProjectId: projectId
    }))
  }

  const handleTaskSubmit = () => {
    if (!newTask.title || !newTask.content || !data.currentProjectId) return

    if (editingTask) {
      updateTaskMutation.mutate({
        ...editingTask,
        ...newTask,
        id: editingTask.id as UUID,
        projectId: data.currentProjectId,
        priority: newTask.priority || TaskPriority.MEDIUM,
        status: newTask.status || TaskStatus.BACKLOG,
        title: newTask.title || "",
        deadlineAt: newTask.deadlineAt ? new Date(newTask.deadlineAt) : undefined
      })
    } else {
      createTaskMutation.mutateAsync({
        ...newTask,
        projectId: data.currentProjectId,
        priority: newTask.priority || TaskPriority.MEDIUM,
        status: newTask.status || TaskStatus.BACKLOG,
        title: newTask.title || "",
        deadlineAt: newTask.deadlineAt ? new Date(newTask.deadlineAt) : undefined
      })
    }

    if (!createTaskMutation.isPending && !updateTaskMutation.isPending) {
      closeTaskDialog()
    }
  }

  const openTaskDialog = (task: Partial<Task> | null = null) => {
    setEditingTask(task)
    setNewTask(
      task || {
        title: "",
        content: "",
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.BACKLOG,
        projectId: data.currentProjectId || "",
        assignee: { id: "", name: "" },
        deadlineAt: ""
      }
    )
    setShowTaskDialog(true)
  }

  const closeTaskDialog = () => {
    setShowTaskDialog(false)
    setEditingTask(null)
  }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const sourceColumn = data.columns[source.droppableId]
    const destinationColumn = data.columns[destination.droppableId]
    if (!sourceColumn || !destinationColumn) return

    const movedTask = sourceColumn.tasks ? sourceColumn.tasks[source.index] : null
    if (!movedTask) return

    const updatedSourceTasks = sourceColumn.tasks ? [...sourceColumn.tasks] : []
    updatedSourceTasks.splice(source.index, 1)

    const updatedDestinationTasks = destinationColumn.tasks ? [...destinationColumn.tasks] : []
    updatedDestinationTasks.splice(destination.index, 0, movedTask)

    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [source.droppableId]: { ...sourceColumn, tasks: updatedSourceTasks },
        [destination.droppableId]: { ...destinationColumn, tasks: updatedDestinationTasks }
      }
    }))

    // try {
    //   await updateTaskMutation.mutate({
    //     ...movedTask,
    //     status: destination.droppableId
    //   })
    // } catch (error) {
    //   console.error("Error updating task status:", error)
    // }

    try {
      const updatedTask = {
        ...movedTask,
        status: destination.droppableId
      }
      const validatedTask = UpdateTaskSchema.safeParse(updatedTask)
      if (!validatedTask.success) {
        return
      }
      await updateTaskMutation.mutateAsync(validatedTask.data)
    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  if (tasksLoading || assigneesLoading) return <div>Loading...</div>
  if (tasksError) return <div>Error loading tasks: {tasksError.message}</div>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <Button
          variant="ghost"
          onClick={() => navigate(`/projects/${workspaceId}`)}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="mb-4">
        <select
          value={data.currentProjectId || ""}
          onChange={(e) => changeProject(e.target.value)}
          className="border p-2 mr-2 rounded"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => openTaskDialog()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            return (
              <Column
                key={column.id}
                column={column}
                assignees={assignees}
                projectId={data.currentProjectId as UUID}
                onAssign={() => {}}
                onDelete={() => {}}
                onUpdate={() => {}}
              />
            )
          })}
        </div>
      </DragDropContext>
      {showTaskDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">{editingTask ? "Edit Task" : "Add New Task"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title || ""}
              onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              placeholder="Content"
              value={newTask.content || ""}
              onChange={(e) => setNewTask((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
            />

            <select
              value={newTask.priority || TaskPriority.MEDIUM}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  priority: e.target.value as TaskPriority // Cast to TaskPriority
                }))
              }
              className="w-full p-2 border rounded mb-2"
            >
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
              <option value="OPTIONAL">Optional</option>
            </select>
            <input
              type="date"
              value={newTask.deadlineAt || ""}
              onChange={(e) => setNewTask((prev) => ({ ...prev, deadlineAt: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={newTask.assignee?.id || ""}
              onChange={(e) => setNewTask((prev) => ({ ...prev, assigneeId: e.target.value }))}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Unassigned</option>
              {assignees?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={closeTaskDialog}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleTaskSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
