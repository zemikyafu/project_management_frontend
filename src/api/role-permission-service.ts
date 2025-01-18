import api from '.';
import { UUID } from 'crypto';

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
