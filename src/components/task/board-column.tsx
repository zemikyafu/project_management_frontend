import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { TaskCard } from "./task-card"
import { Column as ColumnType, Assignee } from "../../types/index"

interface ColumnProps {
  column: ColumnType
  assignees: Assignee[]
  onAssign: (taskId: string, userId: string) => void
  onDelete: (taskId: string) => void
  onUpdate: (taskId: string, newContent: string) => void
}

export const Column: React.FC<ColumnProps> = ({
  column,
  assignees,
  onAssign,
  onDelete,
  onUpdate
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h2 className="font-bold mb-4">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[100px] ${snapshot.isDraggingOver ? "bg-blue-100" : ""}`}
          >
            {(column.tasks || []).map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                users={assignees}
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
