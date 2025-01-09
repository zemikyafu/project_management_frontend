import axios from 'axios';
import { UUID } from 'crypto';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api/v1';

const api = axios.create({
  baseURL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("token new",token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("config",config);
    return config;
  },
);


api.interceptors.response.use(
    (response) => {
      if (response.data.status === 'error') {
        throw new Error(response.data.errors?.map((e: { message: any; }) => e.message).join(', ') || 'An unknown error occurred');
      }
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.errors?.map((e: { message: any; }) => e.message).join(', ') || 'No response received from the server';
  
      throw new Error(message);
    }
  );
  

export const createCompany = async (name:string,email:string,address:string) => {
  console.log("token",localStorage.getItem('token'));
  const response = await api.post("/companies/", { name,email,address });
  return response.data.data;
};

export const getCompanyById = async (id: string) => {
  const response = await api.get(`/companies/${id}`);
  return response.data.data;
};

export const updateCompany = async (id:UUID,name:string,email:string,address:string) => {
  const response = await api.patch(`/companies/${id}`, { name,email,address });
  return response.data.data;
};
