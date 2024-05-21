import { defineStore } from 'pinia'
import { removeKnowledge, saveKnowledge, editKnowledge } from './actions'
import { getKnowledge, getKnowledgesByRoleId } from './getters'
import { knowledges } from './state'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    removeKnowledge,
    getKnowledgesByRoleId,
    saveKnowledge,
    editKnowledge
  }
})
