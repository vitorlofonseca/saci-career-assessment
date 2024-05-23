import { get, post, put } from '@/services/http'
import { getRoles } from './getters'
import type { Role } from '@/domain/Role'
import { deleteRequest } from '@/services/http'
import { roles } from './state'

function setRoles(newRoles: Role[]): void {
  roles.value = newRoles
}

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const fetchedRoles = await get<Role[]>('/roles')

  setRoles(fetchedRoles)
}

async function addRole(role: Role): Promise<void> {
  await post<Role[]>('/roles', role)
  roles.value.push(role)
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

async function removeRole(roleId: string) {
  await deleteRequest(`/roles/${roleId}`)
  roles.value = roles.value.filter((role) => role.id !== parseInt(roleId))
}

export { fetchRoles, addRole, editRoleAction, removeRole }
