import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { UUID } from "crypto"
import InvitationService from "../api/invitation"
import { InvitationCreateFormValues } from "../schemas/invitation"
const QUERY_KEY = "invitations"
export function getQueryKey(id?: string) {
  if (id) {
    return [QUERY_KEY, id]
  }
  return [QUERY_KEY]
}
export function useFetchInvitations() {
  const { data, error, isLoading } = useQuery({
    queryKey: getQueryKey(),
    queryFn: () => InvitationService.getAllInvitation(),
    staleTime: Infinity
  })
  return { invitations: data, error, isLoading }
}
export function useCreateInvitation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (invitationData: InvitationCreateFormValues) =>
      InvitationService.createInvitation(invitationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey() })
    }
  })
}
