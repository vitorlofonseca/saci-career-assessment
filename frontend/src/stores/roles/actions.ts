import { get, post, put } from '@/services/http'
import { getRoles } from './getters'
import { setRoles, roles } from './state'
import type { Role } from '@/domain/Role'
import { deleteRequest } from '@/services/http'

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const fetchedRoles = await get<Role[]>('/roles')

  setRoles(fetchedRoles)
}

async function addRole(role: Role) {
  roles.value.push(role)
  await post<Role[]>('/roles', role)
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

function removeRole(roleId: string) {
  const response = deleteRequest(`/roles/${roleId}`)
  roles.value = roles.value.filter((role) => role.id !== parseInt(roleId))
  return response
}
export { fetchRoles, addRole, editRoleAction, removeRole }
