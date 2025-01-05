import axios from 'axios';
import { UUID } from 'crypto';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api/v1';

const api = axios.create({
  baseURL
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', { email, password });
  
  if (response.data.status === 'error') {
    throw new Error(response.data.errors?.map((e: { message: any; }) => e.message).join(', ') || 'An unknown error occurred');
  }
  return response.data.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/signup', { name, email, password });
  
  if (response.data.status === 'error') {
    throw new Error(response.data.errors?.map((e: { message: any; }) => e.message).join(', ') || 'An unknown error occurred');
  }
  return response.data.data;
};
export const getUserProfile = async (userId:UUID,token:string) => {
    const response = await api.get(`/users/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    ;
    
    if (response.data.status === 'error') {
        throw new Error(response.data.errors?.map((e: { message: any; }) => e.message).join(', ') || 'An unknown error occurred');
    }
    return response.data.data;
};

export const updateProfile = async (userId: UUID, name: string, email: string, token: string) => {
    const response = await api.patch(`/users/${userId}`, { name, email }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (response.data.status === 'error') {
        throw new Error(response.data.errors?.map((e: { message: any; }) => e.message).join(', ') || 'An unknown error occurred');
    }
    return response.data.data;
};

export const completeOnBoarding = async (invitationId: UUID, name: string, password: string) => {
  const response = await api.post(`/onBoarding/${invitationId}`, { name, password });
  
  if (response.data.status === 'error') {
    throw new Error(response.data.errors?.map((e: { message: any; }) => e.message).join(', ') || 'An unknown error occurred');
  }
  return response.data.data;
};

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
