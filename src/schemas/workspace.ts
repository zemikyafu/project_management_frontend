import {z} from 'zod';

const  WorkspaceCreateSchema = z.object({
    name: z.string().min(3, "Name cannot be empty"),
    description:z.string().min(4,"Description cannot be empty"),
    companyId:z.string().uuid("Invalid UUID"),
});

const WorkspaceUpdateSchema=z.object({ 
    id: z.string().uuid("Invalid UUID"), 
    name: z.string().min(3, "Name cannot be empty"), 
    description: z.string().min(4, "Description cannot be empty"), 
});

export type WorkspaceUpdateFormValue=z.infer<typeof WorkspaceUpdateSchema>;
export type WorkspaceCreateFormValues=z.infer<typeof WorkspaceCreateSchema>;