import { z } from "zod"

export const InvitationCreateSchema = z.object({
  recipientEmail: z.string().email({ message: "recipientEmail must be a valid email" }),
  workspaceId: z.string().uuid({ message: "workspaceId must be a valid UUID" }),
  roleId: z.string().uuid({ message: "roleId must be a valid UUID" })
})
export type InvitationCreateFormValues = z.infer<typeof InvitationCreateSchema>
