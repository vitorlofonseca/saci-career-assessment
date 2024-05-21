import { defineStore } from 'pinia'

import { getKnowledge } from './getters'

import { fetchKnowledges, saveKnowledge, addKnowledge, removeKnowledge } from './actions'

import { knowledges } from './state'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    fetchKnowledges,
    saveKnowledge,
    addKnowledge,
    removeKnowledge
  }
})
