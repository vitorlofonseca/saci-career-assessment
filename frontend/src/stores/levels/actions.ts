import { levels } from './state'
import { get } from '@/services/http'

export async function fetchLevelsByRoleId(roleId: string) {
  const data: any[] | string = await get(`/levels?role_id=${roleId}`)
  if (Array.isArray(data)) {
    levels.value = data.map((level: any) => ({
      id: level.id,
      name: level.name,
      minCoefficient: 0,
      maxCoefficient: 0,
      link: ''
    }))
  } else {
    throw new Error('Failed to fetch levels: Response is not an array.')
  }
}
