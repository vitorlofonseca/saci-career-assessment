import { deleteRequest, get, post, put } from '@/services/http'
import type { Level } from '@/domain/Level'
import type { Role } from '@/domain/Role'
import { roles } from '@/stores/roles/state'

async function removeLevel(levelId: number) {
  await deleteRequest(`/levels/${levelId}`)
  roles.value = roles.value.map((role) => {
    role.levels = role.levels?.filter((level) => level.id !== levelId)
    return role
  })
}
async function addLevel(level: Level, role: Role): Promise<void> {
  const levelWithRoleId = { ...level, roleId: role.id }
  await post<Level[]>('/levels', levelWithRoleId)
  role.levels?.push(level)
}

async function editLevel(level: Level, role: Role): Promise<void> {
  await put<Level[]>(`/levels/${level.id}`, level)
  role.levels = role.levels.map((item) => {
    if (item.id === level.id) {
      return level
    }
    return item
  })
}

export { editLevel, addLevel, removeLevel }
