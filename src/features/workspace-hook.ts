import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import WorkspaceService from "../api/workspace-service"
import { UUID } from "crypto"
import { Workspace } from "@/types"
import { WorkspaceCreateFormValues, WorkspaceUpdateFormValue } from "../schemas/workspace"

const QUERY_KEY = "workspaces"
export function workspaceKey(id?: UUID) {
  if (id) {
    return [QUERY_KEY, id]
  }

  return [QUERY_KEY]
}

export function useFetchWorkspaces(companyId: UUID) {
  const { data, error, isLoading } = useQuery<Workspace[]>({
    queryKey: workspaceKey(companyId),
    queryFn: () => WorkspaceService.fetchCompanyWorkspaces(companyId),
    enabled: !!companyId,
    staleTime: Infinity
  })
  return { workspaces: data, error, isLoading }
}

export function useFetchWorkspace(workspaceId: UUID, companyId: UUID) {
  const { data, error, isLoading } = useQuery<Workspace>({
    queryKey: workspaceKey(workspaceId),
    queryFn: () => WorkspaceService.fetchWorkspaceById(workspaceId, companyId),
    enabled: !!workspaceId,
    staleTime: Infinity
  })

  return { workspace: data, error, isLoading }
}

export function useFetchWorkspaceByWorkspaceId(workspaceId: UUID) {
  const { data, error, isLoading } = useQuery<Workspace>({
    queryKey: workspaceKey(workspaceId),
    queryFn: () => WorkspaceService.fetchWorkspaceByWorkspaceId(workspaceId),
    enabled: !!workspaceId,
    staleTime: Infinity
  })

  return { workspace: data, error, isLoading }
}
export function useCreateWorkspace(companyId: UUID) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (workspaceData: WorkspaceCreateFormValues) =>
      WorkspaceService.createWorkspace(workspaceData, companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKey(companyId) })
    }
  })
}

export function useUpdateWorkspace(companyId: UUID) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (workspaceData: WorkspaceUpdateFormValue) =>
      WorkspaceService.updateWorkspace(workspaceData, companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKey(companyId) })
    }
  })
}
