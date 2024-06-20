import { defineStore } from 'pinia'
import { getLevelsByRoleId } from './actions'

export const useLevelStore = defineStore('levels', () => {
  return {
    getLevelsByRoleId
  }
})
