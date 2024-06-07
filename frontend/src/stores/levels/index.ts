import { defineStore } from 'pinia'
import { getLevels } from './getters'
import { levels } from './state'

export const useLevelsStore = defineStore('levels', () => {
  return {
    levels,
    getLevels,
    async fetchLevelsByRoleId(roleId: string) {
      try {
        const response = await fetch(`http://localhost:8080/api/levels?role_id=${roleId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch levels')
        }
        const data = await response.json()
        levels.value = data.map((level: any) => ({ id: level.id, name: level.name }))
      } catch (error) {
        console.error('Failed to fetch levels:', error)
      }
    }
  }
})
