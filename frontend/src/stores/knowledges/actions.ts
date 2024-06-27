import { get, post, put, deleteRequest } from '@/services/http'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'

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

function removeKnowledge(knowledgeId: number): Promise<void> {
  return deleteRequest(`/knowledges/${knowledgeId}`).then(() => {
    knowledges.value = knowledges.value.filter((knowledge) => knowledge.id !== knowledgeId)
  })
}

async function saveKnowledge(knowledge: Knowledge): Promise<void> {
  await post<Knowledge[]>('/knowledges', knowledge)
  knowledges.value.push(knowledge)
}

async function editKnowledge(knowledge: Knowledge): Promise<void> {
  await put<Knowledge[]>(`/knowledges/${knowledge.id}`, knowledge)
  knowledges.value = knowledges.value.map((item) => {
    if (item.id === knowledge.id) {
      return knowledge
    }
    return item
  })
}

export { fetchKnowledges, setKnowledges, removeKnowledge, saveKnowledge, editKnowledge }
