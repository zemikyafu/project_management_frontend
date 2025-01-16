import axios from "axios";
import { UUID } from "crypto";
import{WorkspaceCreateFormValues,WorkspaceUpdateFormValue} from "../schemas/workspace";
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api/v1';

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

  const WorkspaceService = {

    async fetchCompanyWorkspaces(companyId: UUID) {
        const response = await api.get(`/companies/${companyId}/workspaces/`);
        return response.data.data;
    },

    async fetchWorkspaceById(workspaceId: UUID,companyId: UUID) {
        const response = await api.get(`/companies/${companyId}/workspaces/${workspaceId}`);
        return response.data.data;
    },
    async createWorkspace(workspaceData: WorkspaceCreateFormValues,companyId: UUID) {
        const response = await api.post(`/companies/${companyId}/workspaces/`,workspaceData);
        return response.data.data;
    },
    async updateWorkspace(workspaceData: WorkspaceUpdateFormValue,companyId: UUID) {
        const response = await api.put(`/companies/${companyId}/workspaces/${workspaceData.id}`,workspaceData);
        return response.data.data;
    }
  }

  export default WorkspaceService;
