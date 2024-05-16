import { defineStore } from 'pinia'

import { getKnowledge } from './getters'
import { fetchKnowledge, addKnowledge, removeKnowledge } from './actions'

import { knowledges } from './state'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    fetchKnowledge,
    addKnowledge,
    removeKnowledge
  }
})
