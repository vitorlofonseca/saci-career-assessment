import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'
import { deleteRequest, get, post } from '@/services/http'

async function fetchKnowledges(): Promise<void> {
  if (knowledges?.value?.length > 0) {
    return
  }

  const knowledge = await get<Knowledge[]>('/knowledge')

  setKnowledges(knowledge)
}

function setKnowledges(newKnowledge: Knowledge[]): void {
  knowledges.value = newKnowledge
}
function removeKnowledge(knowledgeId: number) {
  const response = deleteRequest(`/knowledges/${knowledgeId}`)
  knowledges.value = knowledges.value.filter((knowledge) => knowledge.id !== knowledgeId)
  return response
}

async function saveKnowledge(knowledge: Knowledge): Promise<void> {
  await post<Knowledge[]>('/knowledges', knowledge)
  knowledges.value.push(knowledge)
}

export { fetchKnowledges, setKnowledges, removeKnowledge, saveKnowledge }
