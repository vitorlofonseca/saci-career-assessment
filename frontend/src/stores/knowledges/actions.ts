import { get, post } from '@/services/http'
import { getKnowledge } from './getters'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'
import { deleteRequest } from '@/services/http'

export { fetchKnowledges, setKnowledge, addKnowledge, removeKnowledge }

async function fetchKnowledges(): Promise<void> {
  async function fetchKnowledge(): Promise<void> {
    if (getKnowledge?.value?.length > 0) {
      return
    }

    const knowledgeArray = await get<Knowledge[]>('/knowledges')
    setKnowledge(knowledgeArray)
  }

  async function saveKnowledge(knowledge: Knowledge): Promise<void> {
    await post<Knowledge[]>('/knowledges', knowledge)
    knowledges.value.push(knowledge)
  }

  const knowledge = await get<Knowledge[]>('/knowledge')

  setKnowledge(knowledge)
}

async function addKnowledge(knowledge: Knowledge): Promise<void> {
  await post<Knowledge[]>('/knowledge', knowledge)
  knowledges.value.push(knowledge)
}

function setKnowledge(newKnowledge: Knowledge[]): void {
  knowledges.value = newKnowledge
}

function removeKnowledge(knowledgeId: string) {
  const response = deleteRequest(`/knowledges/${knowledgeId}`)
  knowledges.value = knowledges.value.filter((knowledge) => knowledge.id !== parseInt(knowledgeId))
  return response
}

export const saveKnowledge = async (newKnowledge: string) => {
  try {
    const response = await fetch('/api/knowledges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newKnowledge })
    })
    if (!response.ok) {
      throw new Error('Failed to save knowledge')
    }

    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}
