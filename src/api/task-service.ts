import  axios  from "axios";
import { UUID } from "crypto";
import { CreateTaskFormValues,UpdateTaskFormValues } from "@/schemas/task"; 

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

  const TaskService = {
    async fetchTasks(projectId: UUID) {
    const response= await api.get(`/projects/${projectId}/tasks/`);
    console.log("response",response);
    return response.data.data;
    },
    async fetchTaskById(taskId: UUID,projectId: UUID) {
    const response= await api.get(`/projects/${projectId}/tasks/${taskId}`);    
    return response.data.data;
    },
    async createTask(taskData: CreateTaskFormValues,projectId: UUID) {
    const response= await api.post(`/projects/${projectId}/tasks/`,taskData);
    return response.data.data;
    },
    async updateTask(taskData: UpdateTaskFormValues,projectId: UUID) {
    const response= await api.put(`/projects/${projectId}/tasks/${taskData.id}`,taskData);
    return response.data.data;
    },
    async fetchAssignes(projectId: UUID) {
    const response= await api.get(`/projects/${projectId}/tasks/assignees/`);
    return response.data.data;
    }
  }
  export default TaskService;