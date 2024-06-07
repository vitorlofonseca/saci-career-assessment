import type { Level } from '@/domain/Level'
import { roles } from '../roles/state'
import type { Role } from '@/domain/Role'
import { get } from '@/services/http'

async function getLevelsByRoleId(roleId: number): Promise<Level[] | undefined> {
  const role = roles.value.find((role) => role.id === roleId) || ({} as Role)

  if (!role.levels) {
    const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
    role.levels = sortedLevels
  }
  return role.levels
}

export { getLevelsByRoleId }
