import { levels } from './state'
import { get } from '@/services/http'

export async function fetchLevelsByRoleId(roleId: string) {
  try {
    const data: any[] = await get(`/levels?role_id=${roleId}`) // Assuming data is an array of any type
    levels.value = data.map((level: any) => ({
      id: level.id,
      name: level.name,
      minCoefficient: 0, // Provide default values for missing properties
      maxCoefficient: 0,
      link: ''
    }))
  } catch (error) {
    console.error('Failed to fetch levels:', error)
  }
}
