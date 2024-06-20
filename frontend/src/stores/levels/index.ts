import { defineStore } from 'pinia'
import { fetchLevelsByRoleId } from './actions'

export const useLevelStore = defineStore('levels', () => {
  return {
    fetchLevelsByRoleId
  }
})
