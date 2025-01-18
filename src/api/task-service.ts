import api from "."
import { UUID } from "crypto"
import { CreateTaskFormValues, UpdateTaskFormValues } from "@/schemas/task"

const TaskService = {
  async fetchTasks(projectId: UUID) {
    const response = await api.get(`/projects/${projectId}/tasks/`)
    return response.data.data
  },

  async fetchTaskById(taskId: UUID, projectId: UUID) {
    const response = await api.get(`/projects/${projectId}/tasks/${taskId}`)
    return response.data.data
  },

  async createTask(taskData: CreateTaskFormValues, projectId: UUID) {
    const response = await api.post(`/projects/${projectId}/tasks/`, taskData)
    return response.data.data
  },
  async updateTask(taskData: UpdateTaskFormValues, projectId: UUID) {
    const response = await api.put(`/projects/${projectId}/tasks/${taskData.id}`, taskData)
    return response.data.data
  },
  async fetchAssignes(projectId: UUID) {
    const response = await api.get(`/projects/${projectId}/tasks/assignees/`)
    return response.data.data
  }
}
export default TaskService
