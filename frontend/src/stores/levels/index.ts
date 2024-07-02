import { defineStore } from 'pinia'
import { removeLevel, addLevel, editLevel } from './actions'
import { getLevelsByRoleId, getLevelById } from './getters'

export const useLevelStore = defineStore('levels', () => {
  return {
    editLevel,
    getLevelById,
    getLevelsByRoleId,
    removeLevel,
    addLevel
  }
})
