import { get, post, put, deleteRequest } from '@/services/http'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'
import { roles } from '../roles/state'

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
  const response = await post<Knowledge>('/knowledges', knowledge)
  const role = roles.value.find((role) => knowledge.roleId === role.id)
  role?.knowledges?.push(response)
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

export { fetchKnowledges, saveKnowledge, editKnowledge, setKnowledges, removeKnowledge }
