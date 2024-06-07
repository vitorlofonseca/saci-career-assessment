import { deleteRequest, get, post } from '@/services/http'
import { roles } from '../roles/state'
import type { Level } from '@/domain/Level'
import type { Role } from '@/domain/Role'

async function removeLevel(levelId: number) {
  await deleteRequest(`/levels/${levelId}`)
}

async function addLevel(level: Level, role: Role): Promise<void> {
  const levelWithRoleId = { ...level, roleId: role.id }
  await post<Level[]>('/levels', levelWithRoleId)
  role.levels?.push(level)
}

export { removeLevel, addLevel }
