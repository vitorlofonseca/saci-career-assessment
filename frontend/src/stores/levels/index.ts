import { defineStore } from 'pinia'
import { removeLevel, addLevel } from './actions'
import { getLevelsByRoleId } from './getters'

export const useLevelStore = defineStore('levels', () => {
  return {
    getLevelsByRoleId,
    removeLevel,
    addLevel
  }
})
