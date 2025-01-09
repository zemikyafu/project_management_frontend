import React, { useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Column } from "./board-column"
import { KanbanData, Task, User, Project } from "../../types/kanban"

const initialData: KanbanData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasks: [
        { id: "task-1", content: "Take out the garbage", projectId: "project-1" },
        { id: "task-2", content: "Watch my favorite show", projectId: "project-1" },
        { id: "task-3", content: "Charge my phone", projectId: "project-1" }
      ]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      tasks: [{ id: "task-4", content: "Cook dinner", projectId: "project-1" }]
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      tasks: [{ id: "task-5", content: "Create a Kanban board", projectId: "project-1" }]
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  users: [
    { id: "user-1", name: "Alice" },
    { id: "user-2", name: "Bob" },
    { id: "user-3", name: "Charlie" }
  ],
  projects: [
    { id: "project-1", name: "Personal Tasks" },
    { id: "project-2", name: "Work Project" }
  ],
  currentProject: "project-1"
}

export const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<KanbanData>(initialData)
  const [newTask, setNewTask] = useState<string>("")

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceColumn = data.columns[source.droppableId]
    const destColumn = data.columns[destination.droppableId]
    const newSourceTasks = Array.from(sourceColumn.tasks)
    const newDestTasks =
      source.droppableId === destination.droppableId ? newSourceTasks : Array.from(destColumn.tasks)
    const [movedTask] = newSourceTasks.splice(source.index, 1)
    newDestTasks.splice(destination.index, 0, movedTask)

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          tasks: newSourceTasks
        },
        [destColumn.id]: {
          ...destColumn,
          tasks: newDestTasks
        }
      }
    }

    setData(newData)
  }

  const addNewTask = () => {
    if (newTask.trim() === "") return

    const newTaskObj: Task = {
      id: `task-${Date.now()}`,
      content: newTask,
      projectId: data.currentProject
    }

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        "column-1": {
          ...data.columns["column-1"],
          tasks: [...data.columns["column-1"].tasks, newTaskObj]
        }
      }
    }

    setData(newData)
    setNewTask("")
  }

  const assignTask = (taskId: string, userId: string) => {
    const newData = { ...data }
    for (const columnId of data.columnOrder) {
      const column = newData.columns[columnId]
      const taskIndex = column.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = {
          ...column.tasks[taskIndex],
          assignedTo: userId || undefined
        }
        break
      }
    }
    setData(newData)
  }

  const deleteTask = (taskId: string) => {
    const newData = { ...data }
    for (const columnId of data.columnOrder) {
      const column = newData.columns[columnId]
      const taskIndex = column.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1)
        break
      }
    }
    setData(newData)
  }

  const updateTask = (taskId: string, newContent: string) => {
    const newData = { ...data }
    for (const columnId of data.columnOrder) {
      const column = newData.columns[columnId]
      const taskIndex = column.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = {
          ...column.tasks[taskIndex],
          content: newContent
        }
        break
      }
    }
    setData(newData)
  }

  const changeProject = (projectId: string) => {
    setData({ ...data, currentProject: projectId })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="mb-4">
        <select
          value={data.currentProject}
          onChange={(e) => changeProject(e.target.value)}
          className="border p-2 mr-2 rounded"
        >
          {data.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="border p-2 mr-2 rounded"
        />
        <button onClick={addNewTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.tasks.filter((task) => task.projectId === data.currentProject)
            return (
              <Column
                key={column.id}
                column={{ ...column, tasks }}
                users={data.users}
                onAssign={assignTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}
