import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { TaskCard } from "./task-card"
import { Column as ColumnType, User } from "../../types/kanban"

interface ColumnProps {
  column: ColumnType
  users: User[]
  onAssign: (taskId: string, userId: string) => void
  onDelete: (taskId: string) => void
  onUpdate: (taskId: string, newContent: string) => void
}

export const Column: React.FC<ColumnProps> = ({ column, users, onAssign, onDelete, onUpdate }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h2 className="font-bold mb-4">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[100px]">
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                users={users}
                onAssign={onAssign}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
