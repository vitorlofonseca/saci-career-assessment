import type { Level } from '@/domain/Level'
import { roles } from '../roles/state'
import type { Role } from '@/domain/Role'
import { get } from '@/services/http'
import { getRoleById } from '../knowledges/getters'

async function getLevelsByRoleId(roleId: number): Promise<Level[] | undefined> {
  const role = getRoleById(roleId)

  if(!role) {
    throw "Role doesn't exist with " + roleId
  }

  if (role && !role.levels) {
    const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
    role.levels = sortedLevels
  }

  return role?.levels
}

export { getLevelsByRoleId }
