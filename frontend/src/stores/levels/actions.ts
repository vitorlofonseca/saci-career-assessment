import { levels } from './state'
import { get } from '@/services/http'

export interface Level {
  id: number
  name: string
  minCoefficient: number
  maxCoefficient: number
  link: string
}

export async function fetchLevelsByRoleId(roleId: string): Promise<Level[]> {
  try {
    const data: Level[] = await get(`/levels?role_id=${roleId}`)

    const levelsData: Level[] = data.map((level) => ({
      id: level.id,
      name: level.name,
      minCoefficient: 0,
      maxCoefficient: 0,
      link: ''
    }))

    levels.value = levelsData

    return levelsData
  } catch (error) {
    console.error('Error fetching levels:', error)
    throw new Error('Failed to fetch levels')
  }
}
