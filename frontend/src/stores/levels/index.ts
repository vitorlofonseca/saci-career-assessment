import { defineStore } from 'pinia'
import { getLevelsByRoleId, getScoreResponse } from './actions'

export const useLevelStore = defineStore('levels', () => ({
  getLevelsByRoleId,
  getScoreResponse
}))
