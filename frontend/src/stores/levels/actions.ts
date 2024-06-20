import { get } from '@/services/http'
import { roles } from '../roles/state'
import type { Level } from '@/domain/Level'

async function getLevelsByRoleId(roleId: number): Promise<Level[] | undefined> {
  const role = roles.value.find((role) => role.id === roleId)

  if (role) {
    if (!role.levels) {
      const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
      role.levels = sortedLevels
    }
    return role.levels
  }
}

export { getLevelsByRoleId }
