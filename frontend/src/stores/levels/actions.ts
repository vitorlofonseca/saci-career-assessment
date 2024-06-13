import { levels } from './state'
import { get } from '@/services/http'

export async function fetchLevelsByRoleId(roleId: string) {
  try {
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
      console.error('Failed to fetch levels: Response is not an array:', data)
    }
  } catch (error) {
    console.error('Failed to fetch levels:', error)
  }
}
