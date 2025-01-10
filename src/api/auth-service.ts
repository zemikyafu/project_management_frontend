import axios from 'axios';
import { UUID } from 'crypto';

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

const Authservice = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/signin', { email, password });
    return response.data.data;
  },

  async register(name: string, email: string, password: string) {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data.data;
  },

  async getUserProfile(userId: UUID) {
    const token=localStorage.getItem('token')
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  },

  async updateProfile(userId: UUID, name: string, email: string) {
    const token=localStorage.getItem('token')
    const response = await api.patch(`/users/${userId}`, { name, email }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  },

  async completeOnBoarding(invitationId: UUID, name: string, password: string) {
    const response = await api.post(`/onBoarding/${invitationId}`, { name, password });
    return response.data.data;
  }
};

export default Authservice;
