import { defineStore } from 'pinia'
import { removeLevel, saveLevel, editLevel, fetchLevels } from './actions'
import { getLevel } from './getters'
import { levels } from './state'

export const useLevelStore = defineStore('levels', () => {
  return {
    levels,
    getLevel,
    removeLevel,
    saveLevel,
    fetchLevels,
    editLevel
  }
})
