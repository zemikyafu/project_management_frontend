import {z} from 'zod';

const ProjectCreateSchema = z.object({
    name: z.string().nonempty({ message: "name can not be empty" }),
    description: z.string().optional(),
    status: z.string().nonempty({ message: "status can not be empty" }),
    workspaceId: z.string().uuid({ message: "workspaceId must be a valid UUID" }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});
const ProjectUpdateSchema = z.object({
    id: z.string().uuid({ message: "id must be a valid UUID" }),
    name: z.string().nonempty({ message: "name can not be empty" }),
    description: z.string().optional(),
    status: z.string().nonempty({ message: "status can not be empty" }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});
export type ProjectUpdateFormValues = z.infer<typeof ProjectUpdateSchema>;
export type ProjectCreateFormValues = z.infer<typeof ProjectCreateSchema>;