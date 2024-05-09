import { get, post } from '@/services/http'
import { getRoles } from './getters'
import { roles } from './state'
import type { Role } from '@/domain/Role'
import {patch} from '@/services/http'

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const roles = await get<Role[]>('/roles')

  setRoles(roles)
}

async function addRole(role: Role): Promise<void> {
  await post<Role[]>('/roles', role)
  roles.value.push(role)
}

function setRoles(newRoles: Role[]): void {
  roles.value = newRoles
}

const editRoleAction = async (roleId: number, editedRole: any) => {
  try {
    const response : any = await patch(`/api/roles/${roleId}`, editedRole);
    return response.message || 'Role updated successfully';
    
  } catch (error) {

    throw new Error('Failed to update role');
  }
};

export { fetchRoles, addRole, editRoleAction }
