import { defineStore } from 'pinia'
import { getLevels } from './getters'
import { levels } from './state'

export const useLevelStore = defineStore('levels', () => {
  return {
    levels,
    getLevels
  }
})
