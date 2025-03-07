import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { UUID } from "crypto"
import UserService from "../api/user-service"
import { User } from "@/types"

const QUERY_KEY = "users"
export function getQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }
  return [QUERY_KEY]
}
export function useFetchUser(companyId: UUID) {
  const { data, error, isLoading } = useQuery<User>({
    queryKey: getQueryKey(),
    queryFn: () => UserService.fetchCompanyUsers(companyId),
    staleTime: Infinity
  })
  return { users: data, error, isLoading }
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, status }: { userId: UUID; status: string }) =>
      UserService.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    }
  })
}
