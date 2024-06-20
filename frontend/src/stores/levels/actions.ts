import { get } from '@/services/http'
import { roles } from '../roles/state'
import type { Level } from '@/domain/Level'

async function fetchLevelsByRoleId(roleId: number): Promise<void> {
  const role = roles.value.find((role) => role.id === roleId)

  if (role && !role.levels) {
    const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
    return role.levels

    role.levels = sortedLevels
  }
}

export { fetchLevelsByRoleId }
