import { get } from '@/services/http'
import { roles } from '../roles/state'
import type { Level } from '@/domain/Level'

async function fetchLevelsByRoleId(roleId: number): Promise<Level[] | undefined> {
  const role = roles.value.find((role) => role.id === roleId)

  if (role && !role.levels) {
    const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
    role.levels = sortedLevels
  }

  return role.levels
}

export { fetchLevelsByRoleId }
