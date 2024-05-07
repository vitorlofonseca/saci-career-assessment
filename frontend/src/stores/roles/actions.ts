import { get, post } from '@/services/http'
import { getRoles } from './getters'
import { roles } from './state'
import type { Role } from '@/domain/Role'
import { deleteRequest } from '@/services/http'

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const roles = await get<Role[]>('/roles')

  setRoles(roles)
}

async function addRole(role: Role) {
  roles.value.push(role)
  await post<Role[]>('/roles', role)
}

function setRoles(newRoles: Role[]): void {
  roles.value = newRoles
}

function removeRole(roleId: string) {
  const response = deleteRequest(`/roles/${roleId}`)
  roles.value = roles.value.filter((role) => role.id !== parseInt(roleId))
  return response
}

export { fetchRoles, addRole, removeRole }
