import { defineStore } from 'pinia'
import { levels } from './state'
import { getLevels } from './getters'
import { fetchLevelsByRoleId } from './actions'

export const useLevelsStore = defineStore('levels', () => {
  return {
    levels,
    getLevels,
    fetchLevelsByRoleId
  }
})
