import { defineStore } from 'pinia'

import { getKnowledge } from './getters'
import { fetchKnowledges, saveKnowledge, addKnowledge, removeKnowledge } from './actions'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'

export const useKnowledgeStore = defineStore('knowledges', () => {
  return {
    knowledges,
    getKnowledge,
    fetchKnowledges,
    saveKnowledge,
    addKnowledge,
    removeKnowledge,
    knowledgeExists(id: string) {
      return this.knowledges.value.some((knowledge) => knowledge.id === parseInt(id))
    }
  }
})
