import React, { useState, useEffect } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Column } from "./board-column"
import { KanbanData, Task, User, Project } from "../../types/kanban"
import { useQuery } from "@tanstack/react-query"

const fetchProjects = async (): Promise<Project[]> => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "project-1",
          name: "Website Redesign",
          tasks: [
            { id: "task-1", content: "Design homepage", projectId: "project-1", status: "To Do" },
            {
              id: "task-2",
              content: "Implement responsive layout",
              projectId: "project-1",
              status: "In Progress"
            }
          ]
        },
        {
          id: "project-2",
          name: "Mobile App Development",
          tasks: [
            { id: "task-3", content: "Create wireframes", projectId: "project-2", status: "To Do" },
            {
              id: "task-4",
              content: "Develop user authentication",
              projectId: "project-2",
              status: "In Progress"
            }
          ]
        }
      ])
    }, 1000)
  })
}

const initialData: KanbanData = {
  columns: {
    "To Do": { id: "To Do", title: "To Do" },
    "In Progress": { id: "In Progress", title: "In Progress" },
    Done: { id: "Done", title: "Done" }
  },
  columnOrder: ["To Do", "In Progress", "Done"],
  users: [
    { id: "user-1", name: "Alice" },
    { id: "user-2", name: "Bob" },
    { id: "user-3", name: "Charlie" }
  ],
  projects: [],
  currentProjectId: null
}

export const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<KanbanData>(initialData)
  const [newTask, setNewTask] = useState<string>("")

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await fetchProjects()
      setData((prevData) => ({
        ...prevData,
        projects,
        currentProjectId: projects.length > 0 ? projects[0].id : null
      }))
    }
    loadProjects()
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newData = { ...data }
    const currentProject = newData.projects.find((p) => p.id === newData.currentProjectId)
    if (!currentProject) return

    const taskToMove = currentProject.tasks.find((t) => t.id === draggableId)
    if (!taskToMove) return

    // Remove the task from its original position
    currentProject.tasks = currentProject.tasks.filter((t) => t.id !== draggableId)

    // Update the task's status
    taskToMove.status = destination.droppableId

    // Insert the task at its new position
    currentProject.tasks.push(taskToMove)

    setData(newData)
  }

  const addNewTask = () => {
    if (newTask.trim() === "" || !data.currentProjectId) return

    const newTaskObj: Task = {
      id: `task-${Date.now()}`,
      content: newTask,
      projectId: data.currentProjectId,
      status: "To Do"
    }

    const newData = { ...data }
    const currentProject = newData.projects.find((p) => p.id === data.currentProjectId)
    if (currentProject) {
      currentProject.tasks.push(newTaskObj)
      setData(newData)
      setNewTask("")
    }
  }

  const assignTask = (taskId: string, userId: string) => {
    const newData = { ...data }
    const currentProject = newData.projects.find((p) => p.id === newData.currentProjectId)
    if (currentProject) {
      const task = currentProject.tasks.find((t) => t.id === taskId)
      if (task) {
        task.assignedTo = userId || undefined
        setData(newData)
      }
    }
  }

  const deleteTask = (taskId: string) => {
    const newData = { ...data }
    const currentProject = newData.projects.find((p) => p.id === newData.currentProjectId)
    if (currentProject) {
      currentProject.tasks = currentProject.tasks.filter((t) => t.id !== taskId)
      setData(newData)
    }
  }

  const updateTask = (taskId: string, newContent: string) => {
    const newData = { ...data }
    const currentProject = newData.projects.find((p) => p.id === newData.currentProjectId)
    if (currentProject) {
      const task = currentProject.tasks.find((t) => t.id === taskId)
      if (task) {
        task.content = newContent
        setData(newData)
      }
    }
  }

  const changeProject = (projectId: string) => {
    setData({ ...data, currentProjectId: projectId })
  }

  const currentProject = data.projects.find((p) => p.id === data.currentProjectId)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="mb-4">
        <select
          value={data.currentProjectId || ""}
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
      {currentProject && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId]
              const tasks = currentProject.tasks.filter((task) => task.status === columnId)
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
      )}
    </div>
  )
}
