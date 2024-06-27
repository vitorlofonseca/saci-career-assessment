import { defineStore } from 'pinia'
import { getLevelsByRoleId, editLevel } from './actions'
import { getLevelById } from './getters'
import { levels } from './state'

export const useLevelStore = defineStore('levels', () => {
  return {
    editLevel,
    getLevelById,
    getLevelsByRoleId
  }
})
