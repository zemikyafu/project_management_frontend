import axios from "axios";
import { UUID } from "crypto";
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api/v1';
import { ProjectCreateFormValues,ProjectUpdateFormValues} from "@/schemas/project";
const api = axios.create({
    baseURL
  });
  
  api.interceptors.response.use(
    (response) => {
      if (response.data.status === 'error') {
        throw new Error(
          response.data.errors?.map((e: { message: any }) => e.message).join(', ') || 'An unknown error occurred'
        );
      }
      return response;
    },
    (error) => {
      const message = error.response?.data?.errors?.map((e: { message: any }) => e.message).join(', ') 
        || 'No response received from the server';
      throw new Error(message);
    }
  );

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const ProjectService = {
    
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