import { defineStore } from 'pinia'

import { getKnowledge } from './getters'

import { fetchKnowledges, addKnowledge, removeKnowledge } from './actions'

import { knowledges } from './state'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    fetchKnowledges,
    addKnowledge,
    removeKnowledge
  }
})
