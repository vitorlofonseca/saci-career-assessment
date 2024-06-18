import { defineStore } from 'pinia'
import { removeLevel, saveLevel, editLevel, fetchLevels, sortLevels } from './actions'
import { levels } from './state'

export const useLevelStore = defineStore('levels', () => {
  return {
    levels,
    removeLevel,
    saveLevel,
    fetchLevels,
    editLevel,
    sortLevels
  }
})
export { removeLevel }
