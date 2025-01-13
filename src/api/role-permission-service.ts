import axios from 'axios';
import { UUID } from 'crypto';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api/v1';

const api = axios.create({
  baseURL,
});

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


const RolePermissionService = {

 async getRoles(companyId: UUID) {
      const response = await api.get(`/roles/companyId/${companyId}`);
      return response.data.data;
    },

  async getPermissions() {
    const response = await api.get('/permissions');
    return response.data.data;
  },

  async getRolePermissions(roleId: UUID) {     
    const response = await api.get(`/roles/${roleId}/permissions`);
    return response.data.data;
  }
};


export default RolePermissionService;
