import { get, post, put } from '@/services/http'
import { getKnowledge } from './getters'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'

async function fetchKnowledges(): Promise<void> {
  if (getKnowledge?.value?.length > 0) {
    return
  }

  const knowledge = await get<Knowledge[]>('/knowledges')

  setKnowledge(knowledge)
}

async function addKnowledge(knowledge: Knowledge): Promise<void> {
  await post<Knowledge[]>('/knowledges', knowledge)
  knowledges.value.push(knowledge)
}

function setKnowledges(newKnowledges: Knowledge[]): void {
  knowledges.value = newKnowledges
}

async function editKnowledge(knowledge: Knowledge): Promise<void> {
  await put<Knowledge[]>(`/knowledges/${knowledge.id}`, knowledge)
  knowledges.value = knowledges.value.map((item) => {
    if (item.id === knowledge.id) {
      if (item !== knowledge) {
        return knowledge
      }
    }
    return item
  })
}

export { fetchKnowledges, addKnowledge, editKnowledge }
