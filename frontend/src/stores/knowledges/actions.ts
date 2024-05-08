import { get, post } from '@/services/http'
import { getKnowledge } from './getters'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'

async function fetchKnowledges(): Promise<void> {
  if (getKnowledge?.value?.length > 0) {
    return
  }

  const knowledgeArray = await get<Knowledge[]>('/knowledges')
  setKnowledges(knowledgeArray)
}

async function saveKnowledge(knowledge: Knowledge): Promise<void> {
  await post<Knowledge[]>('/knowledges', knowledge)
  knowledges.value.push(knowledge)
}

function setKnowledges(newKnowledges: Knowledge[]): void {
  knowledges.value = newKnowledges
}

export { fetchKnowledges, saveKnowledge, setKnowledges }
