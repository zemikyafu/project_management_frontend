import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { Task as TaskType, User } from "../../types/kanban"

interface TaskProps {
  task: TaskType
  index: number
  users: User[]
  onAssign: (taskId: string, userId: string) => void
  onDelete: (taskId: string) => void
  onUpdate: (taskId: string, newContent: string) => void
}

export const TaskCard: React.FC<TaskProps> = ({
  task,
  index,
  users,
  onAssign,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(task.content)

  const handleAssign = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onAssign(task.id, e.target.value)
  }

  const handleUpdate = () => {
    onUpdate(task.id, editedContent)
    setIsEditing(false)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded shadow"
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-1 mb-2 border rounded"
              />
              <button
                onClick={handleUpdate}
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
              <p className="mb-2">{task.content}</p>
              <div className="flex justify-between items-center">
                <select
                  value={task.assignedTo || ""}
                  onChange={handleAssign}
                  className="p-1 border rounded"
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <div>
                  <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">
                    Edit
                  </button>
                  <button onClick={() => onDelete(task.id)} className="text-red-500">
                    Delete
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
