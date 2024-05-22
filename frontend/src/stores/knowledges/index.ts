import { defineStore } from 'pinia'
import { getKnowledge, getKnowledgesByRoleId } from './getters'
import { saveKnowledge } from './actions'

import { knowledges } from './state'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    getKnowledgesByRoleId,
    saveKnowledge
  }
})
