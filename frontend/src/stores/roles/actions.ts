import { get, post, put } from '@/services/http'
import { getRoles } from './getters'
import { roles } from './state'
import type { Role } from '@/domain/Role'

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

async function editRoleAction(role: Role): Promise<void> {
  await put<Role[]>(`/roles/${role.id}`, role)
  roles.value = roles.value.map((item) => {
    if (item.id === role.id) {
      return role
    }
    return item
  })
}
export { fetchRoles, addRole, editRoleAction }
