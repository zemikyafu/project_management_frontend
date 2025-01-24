import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { UUID } from "crypto"
import { Task, Assignee } from "../types"
import { CreateTaskFormValues, UpdateTaskFormValues } from "../schemas/task"
import TaskService from "../api/task-service"

const QUERY_KEY = "tasks"
const QUERY_KEY_ASSIGNES = "assignes"
export function getQuertKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }
  return [QUERY_KEY, id]
}

export function getAssignesQueryKey(id?: UUID) {
  if (id) {
    return [QUERY_KEY_ASSIGNES, id]
  }
  return [QUERY_KEY_ASSIGNES]
}

export function useFetchTasks(projectId: UUID) {
  const { data, error, isLoading } = useQuery<Task[]>({
    queryKey: getQuertKey(projectId),
    queryFn: () => TaskService.fetchTasks(projectId),
    enabled: !!projectId,
    staleTime: Infinity
  })
  return { tasks: data, error, isLoading }
}
export function useFetchAssigneesFromWorkspace(projectId: UUID) {
  const { data, error, isLoading } = useQuery<Assignee[]>({
    queryKey: getAssignesQueryKey(projectId),
    queryFn: () => TaskService.fetchAssignes(projectId),
    enabled: !!projectId,
    staleTime: Infinity
  })
  return { assignees: data, error, isLoading }
}

export function useFetchTask(taskId: UUID, projectId: UUID) {
  const { data, error, isLoading } = useQuery<Task>({
    queryKey: getQuertKey(taskId),
    queryFn: () => TaskService.fetchTaskById(taskId, projectId),
    enabled: !!taskId && !!projectId
  })
  return { task: data, error, isLoading }
}

export function useCreateTask(projectId: UUID) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (taskData: CreateTaskFormValues) => TaskService.createTask(taskData, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKey(projectId) })
    }
  })
}
export function useUpdateTask(projectId: UUID) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (taskData: UpdateTaskFormValues) => TaskService.updateTask(taskData, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKey(projectId) })
    }
  })
}

export function useDeleteTask(projectId: UUID) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (taskId: UUID) => TaskService.deleteTask(taskId, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQuertKey(projectId) })
    }
  })
}
