import { get, post, put } from '@/services/http'
import { getRoles } from './getters'
import type { Role } from '@/domain/Role'
import { deleteRequest } from '@/services/http'
import { roles, levels } from './state'
import type { Level } from '@/domain/Level'

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
function removeLevel(levelId: number): Promise<void> {
  return deleteRequest(`/levels/${levelId}`).then(() => {
    levels.value = levels.value.filter((level) => level.id !== levelId)
  })
}

async function addLevel(level: Level, role: Role): Promise<void> {
  const levelWithRoleId = { ...level, roleId: role.id }
  await post<Level[]>('/levels', levelWithRoleId)
  role.levels?.push(level)
}

export { fetchRoles, addRole, editRoleAction, removeRole, removeLevel, addLevel }
