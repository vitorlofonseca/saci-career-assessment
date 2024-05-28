import { defineStore } from 'pinia'
import { removeKnowledge, saveKnowledge, editKnowledge, fetchKnowledges } from './actions'
import { getKnowledge } from './getters'
import { knowledges } from './state'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    removeKnowledge,
    saveKnowledge,
    fetchKnowledges,
    editKnowledge
  }
})
