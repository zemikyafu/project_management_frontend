import {z} from 'zod';

const CreateTaskScema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    content: z.string().optional(),
    priority: z.string().nonempty({ message: "Priority is required" }),
    status: z.string().nonempty({ message: "Status is required" }),
    projectId: z.string().uuid({ message: "Project ID must be a valid UUID" }),
    assigneeId: z.string().uuid({ message: "Assignee ID must be a valid UUID" }).optional(),
    deadlineAt: z.date().optional()
})
const UpdateTaskSchema = z.object({
    id: z.string().uuid({ message: "ID must be a valid UUID" }),
    title: z.string().nonempty({ message: "Title is required" }),
    content: z.string().optional(),
    priority: z.string().nonempty({ message: "Priority is required" }),
    status: z.string().nonempty({ message: "Status is required" }),
    projectId: z.string().uuid({ message: "Project ID must be a valid UUID" }),
    assigneeId: z.string().uuid({ message: "Assignee ID must be a valid UUID" }).optional(),
    deadlineAt: z.date().optional()
})

export type CreateTaskFormValues = z.infer<typeof CreateTaskScema>;
export type UpdateTaskFormValues = z.infer<typeof UpdateTaskSchema>;