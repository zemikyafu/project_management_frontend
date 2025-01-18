import { UUID } from "crypto";
import api from ".";
import { ProjectCreateFormValues,ProjectUpdateFormValues} from "@/schemas/project";


  const ProjectService= {
    
    async fetchCompanyProjects(workspaceId: UUID) {
        const response = await api.get(`/workspaces/${workspaceId}/projects/`);
        return response.data.data;
    },

    async fetchProjectById(projectId: UUID,workspaceId: UUID) {
        const response = await api.get(`/workspaces/${workspaceId}/projects/${projectId}`);
        return response.data.data;
    },
    async createProject(projectData: ProjectCreateFormValues,workspaceId: UUID) {
        const response = await api.post(`/workspaces/${workspaceId}/projects/`,projectData);
        return response.data.data;
    },
    async updateProject(projectData: ProjectUpdateFormValues,workspaceId: UUID) {
      console.log("projectData in service",projectData);
      console.log("workspaceId in service",workspaceId);
        const response = await api.put(`/workspaces/${workspaceId}/projects/${projectData.id}`,projectData);
        return response.data.data;
    }
  }
  export default ProjectService;