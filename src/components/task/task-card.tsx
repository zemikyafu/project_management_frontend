import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { Task as TaskType, Assignee } from "../../types/index"
import { useDeleteTask } from "../../features/task-hook"

interface TaskProps {
  task: TaskType
  index: number
  users: Assignee[]
  projectId: string
  onAssign: (taskId: string, userId: string) => void
  onUpdate: (taskId: string, updatedTask: Partial<TaskType>) => void
}

export const TaskCard: React.FC<TaskProps> = ({
  task,
  index,
  users,
  projectId,
  onAssign,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState<Partial<TaskType>>({
    title: task.title,
    content: task.content,
    priority: task.priority,
    status: task.status,
    assigneeId: task.assignee?.id || "",
    deadlineAt: task.deadlineAt
  })

  const deleteTaskMutation = useDeleteTask(projectId)

  const handleDelete = () => {
    console.log("Deleting task", task.id)
    console.log("Project ID", projectId)
    deleteTaskMutation.mutate(task.id)
  }

  const handleInputChange = (field: keyof TaskType, value: any) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onUpdate(task.id, editedTask)
    setIsEditing(false)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 mb-2 rounded shadow ${snapshot.isDragging ? "opacity-50" : ""}`}
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Title"
                className="w-full p-1 mb-2 border rounded"
              />
              <textarea
                value={editedTask.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Content"
                className="w-full p-1 mb-2 border rounded"
              />
              <select
                value={editedTask.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                className="w-full p-1 mb-2 border rounded"
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
              <select
                value={editedTask.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full p-1 mb-2 border rounded"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <select
                value={editedTask.assigneeId}
                onChange={(e) => handleInputChange("assigneeId", e.target.value)}
                className="w-full p-1 mb-2 border rounded"
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={editedTask.deadlineAt?.split("T")[0] || ""}
                onChange={(e) => handleInputChange("deadlineAt", e.target.value)}
                className="w-full p-1 mb-2 border rounded"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h4 className="font-bold mb-2">{task.title}</h4>
              <p className="mb-2">{task.content}</p>
              <p className="mb-2 text-sm text-gray-600">Priority: {task.priority}</p>
              <p className="mb-2 text-sm text-gray-600">
                Assignee: {task.assignee?.name || "Unassigned"}
              </p>
              <p className="mb-2 text-sm text-gray-600">
                Deadline:{" "}
                {task.deadlineAt ? new Date(task.deadlineAt).toLocaleDateString() : "None"}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-500"
                    disabled={deleteTaskMutation.isLoading}
                  >
                    {deleteTaskMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
