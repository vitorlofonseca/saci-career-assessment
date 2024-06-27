import { get } from '@/services/http'
import { roles } from '../roles/state'
import type { Level } from '@/domain/Level'
import type { Role } from '@/domain/Role'
import { get, post, put } from '@/services/http'
import { levels } from './state'

async function getLevelsByRoleId(roleId: number): Promise<Level[] | undefined> {
  const role = roles.value.find((role) => role.id === roleId) || ({} as Role)

  if (!role.levels) {
    const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
    role.levels = sortedLevels
  }
  return role.levels
}

async function editLevel(level: Level): Promise<void> {
  await put<Level[]>(`/levels/${level.id}`, level)
  levels.value = levels.value.map((item) => {
    if (item.id === level.id) {
      return level
    }
    return item
  })
}

export { editLevel, getLevelsByRoleId }
